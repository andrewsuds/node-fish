const pool = require("../helpers/db");

function getProfileInfo(req, res) {
  const username = req.params.username;
  pool.query(
    `SELECT 
    name,
    avatar,
    (SELECT picture AS cover FROM post WHERE username = $1 AND picture IS NOT NULL ORDER BY random() LIMIT 1),
    CONCAT(count(post), ' fish caught') as caught,
    CONCAT(COALESCE(sum(weight),0), ' lbs caught') AS weight
    FROM account LEFT JOIN post ON account.accountid = post.accountid
    WHERE username = $1
    group by name, avatar, username;`,
    [username],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ message: err.message });
      }

      if (result) {
        return res.json(result.rows[0]);
      }
    }
  );
}

function getProfilePosts(req, res) {
  const username = req.params.username;
  pool.query(
    `SELECT postid, username, avatar, species, weight, length, caption, picture, location, now()-postdate as postdate,
    (select count(likes) as likecount from likes where postid = post.postid),
    (select count(comments) as commentcount from comments where post.postid = postid),
    (select count(likes) as isliked from likes where postid = post.postid AND accountid = $1)
    FROM post
    INNER JOIN account on post.accountid = account.accountid
    INNER JOIN species on post.speciesid = species.speciesid
    WHERE username = $2
    ORDER BY postid DESC;`,
    [req.session.accountid, username],
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

function getActivity(req, res) {
  pool.query(
    `SELECT now()-likedate as activitydate, post.postid, username, avatar, type from likes
    INNER JOIN post on likes.postid = post.postid
    INNER JOIN account on likes.accountid = account.accountid
    WHERE post.accountid = $1 AND likes.accountid <> $1

    UNION ALL

    SELECT now()-commentdate as activitydate, post.postid, username, avatar, type from comments
    INNER JOIN post on comments.postid = post.postid
    INNER JOIN account on comments.accountid = account.accountid
    WHERE post.accountid = $1 AND comments.accountid <> $1
    
    ORDER BY activitydate;`,
    [req.session.accountid],
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

function uploadAvatar(req, res) {
  if (!req.file) {
    return res.json({ message: "Error in picture upload" });
  }
  const avatar = req.file.filename;
  pool.query(
    "UPDATE account SET avatar = $1 WHERE accountid = $2;",
    [avatar, req.session.accountid],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ changed: false, message: "Error updating account" });
      }

      if (result.rowCount >= 1) {
        return res.json({
          changed: true,
          message: "Sucessfully changed profile picture!",
        });
      }
    }
  );
}

function getRandomPicture(req, res) {
  pool.query(
    "SELECT picture FROM post ORDER BY random() LIMIT 1;",
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ picture: "/happening.png" });
      }

      if (result) {
        return res.json(result.rows[0]);
      }
    }
  );
}

module.exports = {
  getProfileInfo,
  getProfilePosts,
  getActivity,
  uploadAvatar,
  getRandomPicture,
};
