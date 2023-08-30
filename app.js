import express from 'express';
import fs from 'fs';
import pkg from 'pg';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';

const { Pool } = pkg;

const app = express();

const main = fs.readFileSync('public/main.html', 'utf8');
app.get('/', (req, res) => res.type('html').send(main));

const index = fs.readFileSync('public/index.html', 'utf8');
app.get('/app', (req, res) => res.type('html').send(index));

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 3000;

const pool = new Pool({
  user: 'alex',
  host: 'dpg-chqe4q67avjb90kgmqsg-a.oregon-postgres.render.com',
  database: 'twitter_production',
  password: 'QScUHMnWsbyrcFBJBAFkKlDBS7e4uEsj',
  port: '5432',
  ssl: {
    rejectUnauthorized: false,
  },
});

// get posts
app.get('/posts.json', (req, res) => {
  const query = `
  SELECT
    posts.id,
    authors.email,
    authors.nickname,
    posts.content,
    posts.time,
    posts.reposts,
    posts.likes,
    posts.shares      
  FROM
    posts
  JOIN
    authors ON posts.author_id = authors.id;
`;
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results.rows);
    }
  });
});

// creae post
app.post('/posts.json', (req, res) => {
  const {
    // eslint-disable-next-line camelcase
    author_id, content,
  } = req.body;

  const insertQuery = `
    INSERT INTO posts (author_id, content, time, reposts, likes, shares)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  const currentDate = Date.now();
  const formattedDate = new Date(currentDate).toISOString().slice(0, -5);

  // eslint-disable-next-line camelcase
  const insertValues = [author_id, content, formattedDate, 0, 0, 0];

  pool.query(insertQuery, insertValues, (error) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.set('Content-Type', 'application/json');
      res.json({ message: 'Post added successfully' });
    }
  });
});

// delete post
app.delete('/posts.json/:id', (req, res) => {
  const postId = req.params.id;
  const deleteQuery = `
    DELETE FROM posts
    WHERE id = $1
  `;

  const deleteValues = [postId];

  pool.query(deleteQuery, deleteValues, (error) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.set('Content-Type', 'application/json');
      res.json({ message: 'Post deleted successfully' });
    }
  });
});

// update post
app.put('/posts.json/:id', (req, res) => {
  const postId = req.params.id;

  const { content } = req.body;

  const updateQuery = `
    UPDATE posts
    SET content = $1
    WHERE id = $2
  `;

  const updateValues = [content, postId];

  pool.query(updateQuery, updateValues, (error) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.set('Content-Type', 'application/json');
      res.json({ message: 'Post updated successfully' });
    }
  });
});

// create user
app.post('/createUser', async (req, res) => {
  const { nickname, email, password } = req.body;

  const checkNicknameQuery = `
    SELECT id
    FROM authors
    WHERE nickname = $1
  `;

  const nicknameResult = await pool.query(checkNicknameQuery, [nickname]);
  const nicknameData = nicknameResult.rows.length > 0;

  const checkEmailQuery = `
    SELECT id
    FROM authors
    WHERE email = $1
  `;

  const emailResult = await pool.query(checkEmailQuery, [email]);
  const emailData = emailResult.rows.length > 0;

  if (emailData && nicknameData) {
    res.status(410).json({ error: 'Email and nickname already exists' });
    return;
  }

  if (emailData) {
    res.status(409).json({ error: 'Email already exists' });
    return;
  }

  if (nicknameData) {
    res.status(400).json({ error: 'Nickname already exists' });
    return;
  }

  const insertQuery = `
      INSERT INTO authors (nickname, email, password)
      VALUES ($1, $2, $3)
    `;

  const insertValues = [nickname, email, password];

  // eslint-disable-next-line no-shadow
  await pool.query(insertQuery, insertValues);
  // Generate token
  const token = crypto.randomUUID();

  // Save token in data base
  // Search author's id by email
  const authorIdQuery = `
            SELECT id FROM authors WHERE email = $1
            `;
  const authorIdResult = await pool.query(authorIdQuery, [email]);
  const authorId = authorIdResult.rows[0].id;

  // Insert token and author_id in sessions
  const insertQuerySessions = `
            INSERT INTO sessions (author_id, token)
            VALUES ($1, $2)
            `;
  await pool.query(insertQuerySessions, [authorId, token]);

  // Save token in cookie
  // Cookie will expire in 7 days
  const expiresDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  res.cookie('email', email, { expires: expiresDate });
  res.cookie('token', token, { expires: expiresDate });
  res.set('Content-Type', 'application/json');
  res.json({ message: 'User created successfully' });
});

// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const checkUserQuery = `
    SELECT *
    FROM authors
    WHERE email = $1
  `;

  await pool.query(checkUserQuery, [email], async (error, result) => {
    if (result.rows.length > 0) {
      const passwordQuery = `
        SELECT password
        FROM authors
        WHERE email = $1
      `;

      // eslint-disable-next-line no-shadow
      const resultPassword = await pool.query(passwordQuery, [email]);
      const passwordDataBase = resultPassword.rows[0].password;

      if (password === passwordDataBase) {
        // Generate token
        const token = crypto.randomUUID();

        // Search author's id by email
        const authorIdQuery = `
            SELECT id FROM authors WHERE email = $1
            `;
        const authorIdResult = await pool.query(authorIdQuery, [email]);
        const authorId = authorIdResult.rows[0].id;

        // Insert token and author_id in sessions
        const insertQuery = `
            INSERT INTO sessions (author_id, token)
            VALUES ($1, $2)
            `;
        await pool.query(insertQuery, [authorId, token]);

        // Save token in cookie
        // Cookie will expire in 7 days
        const expiresDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res.cookie('email', email, { expires: expiresDate });
        res.cookie('token', token, { expires: expiresDate });

        res.status(200).json({ message: 'Successful login' });
      } else {
        res.status(400).json({ error: 'Password is not correct' });
      }
    } else {
      res.status(404).json({ error: 'User doesn\'t exist' });
    }
  });
});

// Page feed
app.get('/feed', async (req, res) => {
  const { email, token } = req.cookies;

  // Get author_id from table authors with email
  const authorIdQuery = `
    SELECT id FROM authors WHERE email = $1
  `;

  const authorIdResult = await pool.query(authorIdQuery, [email]);
  const authorId = authorIdResult.rows[0].id;

  const sessionQuery = `
    SELECT * FROM sessions
    WHERE author_id = $1 AND token = $2
    `;

  const sessionResult = await pool.query(sessionQuery, [authorId, token]);

  if (sessionResult.rows[0].length === 0) {
    res.type('html').send('Access denied');
  } else {
    res.type('html').send('Access is allowed');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
