const pool = require("../helpers/db");

function getTotalWeight(req, res) {
  pool.query(
    `SELECT username, sum(weight) as weight FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '24 HOURS'
    group by username
    order by weight DESC;`,
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ message: err.message });
      }

      if (result) {
        return res.json(result.rows);
      }
    }
  );
}

function getTotalCaught(req, res) {
  pool.query(
    `SELECT username, count(postid) as caught FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '24 HOURS'
    group by username
    order by caught desc;`,
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ message: err.message });
      }

      if (result) {
        return res.json(result.rows);
      }
    }
  );
}

function getBiggest(req, res) {
  pool.query(
    `SELECT username, max(weight) as weight FROM post
      INNER JOIN account on post.accountid = account.accountid
      WHERE postdate >= NOW()-INTERVAL '24 HOURS'
      group by username
      order by weight DESC;`,
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ message: err.message });
      }

      if (result) {
        return res.json(result.rows);
      }
    }
  );
}

function getSmallest(req, res) {
  pool.query(
    `SELECT username, min(weight) as weight FROM post
      INNER JOIN account on post.accountid = account.accountid
      WHERE postdate >= NOW()-INTERVAL '24 HOURS'
      group by username
      order by weight ASC;`,
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ message: err.message });
      }

      if (result) {
        return res.json(result.rows);
      }
    }
  );
}

function getLongest(req, res) {
  pool.query(
    `SELECT username, max(length) as length FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '24 HOURS'
    group by username
    order by length DESC;`,
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ message: err.message });
      }

      if (result) {
        return res.json(result.rows);
      }
    }
  );
}

module.exports = {
  getTotalWeight,
  getTotalCaught,
  getBiggest,
  getSmallest,
  getLongest,
};
