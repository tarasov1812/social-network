import express from 'express';
import fs from 'fs';
import pkg from 'pg';

const { Pool } = pkg;

const app = express();
app.use(express.static('public'));

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

app.get('/posts.json', (req, res) => {
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results.rows);
    }
  });
});

// Read content of index.html
const html = fs.readFileSync('public/index.html', 'utf8');

// Route to send index.html
app.get('/', (req, res) => res.type('html').send(html));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
