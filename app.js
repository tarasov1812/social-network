import express from 'express';
import fs from 'fs';
import pkg from 'pg';
import crypto from 'crypto';

const { Pool } = pkg;

const app = express();
app.use(express.static('public'));
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
    authors.author,
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
app.post('/createUser', (req, res) => {
  const { nickname, author, password } = req.body;

  const checkUserQuery = `
    SELECT COUNT(*) AS count
    FROM authors
    WHERE nickname = $1
  `;

  pool.query(checkUserQuery, [nickname], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const userCount = result.rows[0].count;

    if (userCount > 0) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const insertQuery = `
      INSERT INTO authors (nickname, author, password)
      VALUES ($1, $2, $3)
    `;

    const insertValues = [nickname, author, password];

    // eslint-disable-next-line no-shadow
    pool.query(insertQuery, insertValues, (error) => {
      if (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.set('Content-Type', 'application/json');
        res.json({ message: 'User created successfully' });
      }
    });
  });
});

// login
app.post('/login', (req, res) => {
  const { nickname, password } = req.body;

  const checkUserQuery = `
    SELECT COUNT(*) AS count
    FROM authors
    WHERE nickname = $1
  `;

  pool.query(checkUserQuery, [nickname], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const userCount = result.rows[0].count;

    if (userCount > 0) {
      const passwordQuery = `
        SELECT password
        FROM authors
        WHERE nickname = $1
      `;

      const insertValues = [nickname];
      // eslint-disable-next-line no-shadow
      pool.query(passwordQuery, insertValues, (error, result) => {
        if (error) {
          console.error('Error executing query', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        const resultPassword = result.rows[0].password;

        if (password === resultPassword) {
          res.status(200).json({ message: 'Successful login' });
        } else {
          res.status(400).json({ error: 'Password is not correct' });
        }
      });
    } else {
      res.status(404).json({ error: 'User doesn\'t exist' });
    }
  });
});

// Generate token

// eslint-disable-next-line consistent-return
app.post('/generate-token', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const token = crypto.randomUUID();

  // Save token in data base
  try {
    // Search author's id by email
    const authorIdQuery = `
      SELECT id FROM authors WHERE author = $1
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
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Read content of index.html
const html = fs.readFileSync('public/index.html', 'utf8');

// Route to send index.html
app.get('/', (req, res) => res.type('html').send(html));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
