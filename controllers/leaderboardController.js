const pool = require("../helpers/db");

function getTotalWeight(req, res) {
  const hours = req.params.hours;
  pool.query(
    `SELECT username, CONCAT(sum(weight), ' lbs') as value FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
    group by username
    order by value DESC;`,
    (err, result) => {
      if (err) {
        return res.status(400).json("Error");
      }
      if (result) {
        return res.json(result.rows);
      }
    }
  );
}

function getTotalCaught(req, res) {
  const hours = req.params.hours;
  pool.query(
    `SELECT username, CONCAT(count(postid), ' fish') as value FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
    group by username
    order by value desc;`,
    (err, result) => {
      if (err) {
        return res.status(400).json("Error");
      }

      if (result) {
        return res.json(result.rows);
      }
    }
  );
}

function getBiggest(req, res) {
  const hours = req.params.hours;
  pool.query(
    `SELECT username, CONCAT(max(weight), ' lbs') as value FROM post
      INNER JOIN account on post.accountid = account.accountid
      WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
      group by username
      order by value DESC;`,
    (err, result) => {
      if (err) {
        return res.status(400).json("Error");
      }

      if (result) {
        return res.json(result.rows);
      }
    }
  );
}

function getSmallest(req, res) {
  const hours = req.params.hours;
  pool.query(
    `SELECT username, CONCAT(min(weight), ' lbs') as value FROM post
      INNER JOIN account on post.accountid = account.accountid
      WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
      group by username
      order by value ASC;`,
    (err, result) => {
      if (err) {
        return res.status(400).json("Error");
      }

      if (result) {
        return res.json(result.rows);
      }
    }
  );
}

function getLongest(req, res) {
  const hours = req.params.hours;
  pool.query(
    `SELECT username, CONCAT(max(length), ' in.') as value FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
    group by username
    order by value DESC;`,
    (err, result) => {
      if (err) {
        return res.status(400).json("Error");
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
