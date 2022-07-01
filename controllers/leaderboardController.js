const pool = require("../helpers/db");

async function getTotalWeight(req, res) {
  const weightQuery = (hours) => {
    return `SELECT username, sum(weight) as weight FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
    group by username
    order by weight DESC;`;
  };
  const day = await pool.query(weightQuery(24));
  const weekend = await pool.query(weightQuery(72));
  return res.json({ day: day.rows, weekend: weekend.rows });
}

async function getTotalCaught(req, res) {
  const caughtQuery = (hours) => {
    return `SELECT username, count(postid) as caught FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
    group by username
    order by caught desc;`;
  };
  const day = await pool.query(caughtQuery(24));
  const weekend = await pool.query(caughtQuery(72));
  return res.json({ day: day.rows, weekend: weekend.rows });
}

async function getBiggest(req, res) {
  const biggestQuery = (hours) => {
    return `SELECT username, max(weight) as weight FROM post
      INNER JOIN account on post.accountid = account.accountid
      WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
      group by username
      order by weight DESC;`;
  };
  const day = await pool.query(biggestQuery(24));
  const weekend = await pool.query(biggestQuery(72));
  return res.json({ day: day.rows, weekend: weekend.rows });
}

async function getSmallest(req, res) {
  const smallestQuery = (hours) => {
    return `SELECT username, min(weight) as weight FROM post
      INNER JOIN account on post.accountid = account.accountid
      WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
      group by username
      order by weight ASC;`;
  };
  const day = await pool.query(smallestQuery(24));
  const weekend = await pool.query(smallestQuery(72));
  return res.json({ day: day.rows, weekend: weekend.rows });
}

async function getLongest(req, res) {
  const longestQuery = (hours) => {
    return `SELECT username, max(length) as length FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
    group by username
    order by length DESC;`;
  };
  const day = await pool.query(longestQuery(24));
  const weekend = await pool.query(longestQuery(72));
  return res.json({ day: day.rows, weekend: weekend.rows });
}

module.exports = {
  getTotalWeight,
  getTotalCaught,
  getBiggest,
  getSmallest,
  getLongest,
};
