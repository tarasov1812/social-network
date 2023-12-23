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
const routes = ['', '/', '/feed', '/profile', '/settings', '/login', '/settings/profile-settings', '/settings/change-password', '/settings/change-email'];

app.get('/app/profile/:id', (req, res) => {
  res.type('html').send(index);
});

routes.forEach((route) => {
  app.get(`/app${route}`, (req, res) => res.type('html').send(index));
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 3000;

const pool = new Pool({
  user: 'twitter_data_base_user',
  host: 'dpg-cjri4861208c73a2ceig-a.oregon-postgres.render.com',
  database: 'twitter_data_base',
  password: 'KDq4Mrt2Eoz7Ps5t1WZwEgFWe1q3Dp8I',
  port: '5432',
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get('/postUserAndSubs', (req, res) => {
  const { userId } = req.query;

  const query = `
    SELECT
      posts.id,
      authors.name,
      authors.nickname,
      authors.avatar,
      authors.about,
      authors.location,
      authors.birthdate,
      authors.showbirthdate,
      posts.author_id,
      posts.content,
      posts.time,
      posts.reposts,
      posts.likes,
      posts.shares,
      posts.img      
    FROM
      posts
    JOIN
      authors ON posts.author_id = authors.id
    WHERE
      posts.author_id = ${userId} OR posts.author_id IN (
        SELECT subscribed_to_id FROM subscriptions WHERE subscriber_id = ${userId}
      );
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

// get posts from user with known id
app.get('/user-posts/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT
      posts.id,
      authors.name,
      authors.nickname,
      authors.avatar,
      authors.about,
      authors.location,
      authors.birthdate,
      authors.showbirthdate,
      posts.author_id,
      posts.content,
      posts.time,
      posts.reposts,
      posts.likes,
      posts.shares,
      posts.img      
    FROM
      posts
    JOIN
      authors ON posts.author_id = authors.id
    WHERE
      posts.author_id = ${userId};
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
    author_id, content, img,
  } = req.body;

  const insertQuery = `
    INSERT INTO posts (author_id, content, time, reposts, likes, shares, img)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  const currentDate = Date.now();
  const formattedDate = new Date(currentDate).toISOString().slice(0, -5);

  // eslint-disable-next-line camelcase
  const insertValues = [author_id, content, formattedDate, 0, 0, 0, img];

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
      INSERT INTO authors (nickname, email, password, avatar)
      VALUES ($1, $2, $3, $4)
    `;
  const emptyAvatar = 'https://ucarecdn.com/117dd0e7-4525-4fe4-ba5a-55f0e4a21b25/5208421_avatar_person_profile_user_icon.png';
  const insertValues = [nickname, email, password, emptyAvatar];

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

  if (email === undefined || token === undefined) {
    res.status(401).send('Unauthorized');
    return;
  }
  // Get author_id from table authors with email
  const authorIdQuery = `
    SELECT id FROM authors WHERE email = $1
  `;

  const authorIdResult = await pool.query(authorIdQuery, [email]);

  if (authorIdResult.rows[0] !== undefined) {
    const authorId = authorIdResult.rows[0].id;

    const sessionQuery = `
    SELECT * FROM sessions
    WHERE author_id = $1 AND token = $2
    `;

    const sessionResult = await pool.query(sessionQuery, [authorId, token]);

    if (sessionResult.rows[0].length === 0) {
      res.status(401).send('Session finished');
    } else {
      const userQuery = `
      SELECT authors.*, 
      (SELECT COUNT(*) FROM subscriptions WHERE subscribed_to_id = authors.id) AS followers_count,
      (SELECT COUNT(*) FROM subscriptions WHERE subscriber_id = authors.id) AS following_count,
      (SELECT COUNT(*) FROM posts WHERE author_id = authors.id) AS post_count
      FROM authors
      WHERE id = $1
    `;
      const currentUser = await pool.query(userQuery, [authorId]);
      res.status(200).send(currentUser.rows[0]);
    }
  } else {
    res.status(401).send('User not found');
  }
});

app.get('/get-user-with-id/:id', async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.query;

  const userQuery = `
      SELECT authors.*, 
      (SELECT COUNT(*) FROM subscriptions WHERE subscribed_to_id = authors.id) AS followers_count,
      (SELECT COUNT(*) FROM subscriptions WHERE subscriber_id = authors.id) AS following_count,
      (SELECT COUNT(*) FROM posts WHERE author_id = authors.id) AS post_count
      FROM authors
      WHERE authors.id = $1
    `;

  const userResult = await pool.query(userQuery, [id]);

  if (userResult.rows.length === 0) {
    res.status(404).send('User not found');
    return;
  }

  const user = userResult.rows[0];

  // check subscribtion for CurrentUserId for user.id
  const subscriptionQuery = `
      SELECT * FROM subscriptions
      WHERE subscriber_id = $1 AND subscribed_to_id = $2
  `;
  const subscriptionResult = await pool.query(subscriptionQuery, [currentUserId, user.id]);

  // add flag isSubscribe
  user.isSubscribed = subscriptionResult.rows.length > 0;

  res.status(200).send(user);
});

// Unsubscribe
app.delete('/unsubscribe', (req, res) => {
  const { subscriberId, subscribedToId } = req.body;
  const query = `
    DELETE FROM subscriptions
    WHERE subscriber_id = $1 AND subscribed_to_id = $2;
  `;

  pool.query(query, [subscriberId, subscribedToId], (error) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Unsubscribed successfully' });
    }
  });
});

// Subscribe
app.post('/subscribe', async (req, res) => {
  const { subscriberId, subscribedToId } = req.body;
  try {
    const query = `
      INSERT INTO subscriptions (subscriber_id, subscribed_to_id)
      VALUES ($1, $2)
    `;
    const values = [subscriberId, subscribedToId];
    await pool.query(query, values);

    res.status(200).json({ success: true, message: 'Subscription successful' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// change profile Data
app.put('/changeProfileDate/:id', (req, res) => {
  const userId = req.params.id;

  const {
    nickname, name, avatar, about, location, birthdate, showbirthdate,
  } = req.body;

  const updateQuery = `
  UPDATE authors
  SET nickname = $1,
      name = $2,
      avatar = $3,
      about = $4,
      location = $5,
      birthdate = $6,
      showbirthdate = $7
  WHERE id = $8
`;

  const updateValues = [nickname, name, avatar, about, location,
    birthdate, showbirthdate, userId];

  pool.query(updateQuery, updateValues, (error) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.set('Content-Type', 'application/json');
      res.json({ message: 'User data updated successfully' });
    }
  });
});

// change password
app.put('/changePassword/:id', async (req, res) => {
  const userId = req.params.id;

  const {
    oldPassword,
    newPassword,
  } = req.body;

  const checkPasswordQuery = `
    SELECT password FROM authors WHERE id = $1
  `;

  const authorIdResult = await pool.query(checkPasswordQuery, [userId]);

  if (authorIdResult.rows.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  const storedPassword = authorIdResult.rows[0].password;

  if (oldPassword === storedPassword) {
    const updateQuery = `
  UPDATE authors
  SET password = $1
  WHERE id = $2
`;

    const updateValues = [newPassword, userId];

    pool.query(updateQuery, updateValues, (error) => {
      if (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.set('Content-Type', 'application/json');
        res.json({ message: 'User password updated successfully' });
      }
    });
  }
  return res.json({ message: 'User password updated successfully' });
});

// change email
app.put('/changeEmail/:id', async (req, res) => {
  const userId = req.params.id;

  const {
    password,
    email,
  } = req.body;

  const checkPasswordQuery = `
    SELECT password FROM authors WHERE id = $1
  `;

  const authorIdResult = await pool.query(checkPasswordQuery, [userId]);

  if (authorIdResult.rows.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  const storedPassword = authorIdResult.rows[0].password;

  if (password === storedPassword) {
    const updateQuery = `
  UPDATE authors
  SET email = $1
  WHERE id = $2
`;

    const updateValues = [email, userId];

    pool.query(updateQuery, updateValues, (error) => {
      if (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.set('Content-Type', 'application/json');
        res.json({ message: 'User password updated successfully' });
      }
    });
  }
  return res.json({ message: 'Email updated successfully' });
});

// get subscribres data
app.get('/getSubscribers/:id/:currentUserId', async (req, res) => {
  const { id, currentUserId } = req.params;
  const subscribersQuery = `
    SELECT sub.subscriber_id, auth.id, auth.name, auth.nickname, auth.about, auth.avatar,
      EXISTS (
        SELECT 1
        FROM subscriptions AS s
        WHERE s.subscriber_id = $1 AND s.subscribed_to_id = sub.subscriber_id
      ) AS isSubscribed
    FROM subscriptions AS sub
    JOIN authors AS auth ON sub.subscriber_id = auth.id
    WHERE sub.subscribed_to_id = $2;
  `;

  const { rows } = await pool.query(subscribersQuery, [currentUserId, id]);
  res.json(rows);
});

// get subscribred data
app.get('/getSubscribed/:id/:currentUserId', async (req, res) => {
  const { id, currentUserId } = req.params;
  const subscriptionsQuery = `
      SELECT sub.subscriber_id, auth.id, auth.name, auth.nickname, auth.about, auth.avatar,
      EXISTS (
        SELECT 1
        FROM subscriptions AS s
        WHERE s.subscriber_id = $1 AND s.subscribed_to_id = sub.subscriber_id
      ) AS isSubscribed
    FROM subscriptions AS sub
    JOIN authors AS auth ON sub.subscribed_to_id = auth.id
    WHERE sub.subscriber_id = $2;
    `;

  const { rows } = await pool.query(subscriptionsQuery, [currentUserId, id]);
  res.json(rows);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
