import express from 'express';
import fs from 'fs';
import pkg from 'pg';

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

// Read content of index.html
const html = fs.readFileSync('public/index.html', 'utf8');

// Route to send index.html
app.get('/', (req, res) => res.type('html').send(html));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
