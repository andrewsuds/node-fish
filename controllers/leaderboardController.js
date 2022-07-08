const pool = require("../helpers/db");

function getTotalWeight(req, res) {
  const hours = req.params.hours;
  pool.query(
    `SELECT username, avatar, CONCAT(sum(weight), ' total lbs') as value FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
    group by username, avatar
    order by sum(weight) DESC;`,
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
    `SELECT username, avatar, CONCAT(count(postid), ' fish') as value FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
    group by username, avatar
    order by count(postid) DESC;`,
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
    `SELECT username, avatar, CONCAT(max(weight), ' lbs') as value FROM post
      INNER JOIN account on post.accountid = account.accountid
      WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
      group by username, avatar
      order by max(weight) DESC;`,
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
    `SELECT username, avatar, CONCAT(min(weight), ' lbs') as value FROM post
      INNER JOIN account on post.accountid = account.accountid
      WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
      group by username, avatar
      order by min(weight) ASC;`,
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
    `SELECT username, avatar, CONCAT(max(length), '"') as value FROM post
    INNER JOIN account on post.accountid = account.accountid
    WHERE postdate >= NOW()-INTERVAL '${hours} HOURS'
    group by username, avatar
    order by max(length) DESC;`,
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
