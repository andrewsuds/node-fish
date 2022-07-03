const pool = require("../helpers/db");

function getProfilePosts(req, res) {
  const username = req.params.username;
  pool.query(
    `SELECT postid, username, species, weight, length, caption, picture, location, postdate,
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
    `SELECT now()-likedate as activitydate, post.postid, username, type from likes
    INNER JOIN post on likes.postid = post.postid
    INNER JOIN account on likes.accountid = account.accountid
    WHERE post.accountid = $1 AND likes.accountid <> $1

    UNION ALL

    SELECT now()-commentdate as activitydate, post.postid, username, type from comments
    INNER JOIN post on comments.postid = post.postid
    INNER JOIN account on comments.accountid = account.accountid
    WHERE post.accountid = $1 AND comments.accountid <> $1
    
    ORDER BY activitydate DESC;`,
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

  return res.json({ message: "You uploaded: " + avatar });
}

module.exports = { getProfilePosts, getActivity, uploadAvatar };
