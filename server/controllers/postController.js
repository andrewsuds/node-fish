const pool = require("../helpers/db");
const exif = require("../helpers/exif");

function createPost(req, res) {
  const weight = req.body.weight;
  let length;
  let location;
  let picture;
  let caption;
  const speciesid = req.body.speciesid;
  const accountid = req.session.accountid;

  if (req.file) {
    picture = req.file.filename;
    location = exif.getGPS(picture);
  }

  if (req.body.length) {
    length = req.body.length;
  }

  if (req.body.caption) {
    caption = req.body.caption;
  }

  pool.query(
    "INSERT INTO post(weight, length, location, picture, caption, speciesid, accountid) VALUES($1,$2,$3,$4,$5,$6,$7);",
    [weight, length, location, picture, caption, speciesid, accountid],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ posted: false, message: "Error in submitting data" });
      }
      if (result) {
        return res.json({ posted: true, message: "Successfully posted!" });
      }
    }
  );
}

function getPosts(req, res) {
  pool.query(
    `SELECT postid, username, species, weight, length, caption, picture, location,
    (select count(likes) as likecount from likes where postid = post.postid),
    (select count(comments) as commentcount from comments where post.postid = postid),
    (select count(likes) as isliked from likes where postid = post.postid AND accountid = $1)
    FROM post
    INNER JOIN account on post.accountid = account.accountid
    INNER JOIN species on post.speciesid = species.speciesid
    ORDER BY postid DESC;`,
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

async function toggleLike(req, res) {
  const postid = req.body.postid;
  const likes = await pool.query(
    "SELECT * FROM likes WHERE accountid = $1 AND postid = $2;",
    [req.session.accountid, postid]
  );

  if (likes.rowCount > 0) {
    pool.query(
      "DELETE FROM likes WHERE accountid = $1 AND postid = $2;",
      [req.session.accountid, postid],
      (err, result) => {
        if (err) {
          console.log(err.message);
          return res.json({ toggled: false });
        }

        if (result) {
          return res.json({ toggled: true, liked: false });
        }
      }
    );
  }

  if (likes.rowCount == 0) {
    pool.query(
      "INSERT INTO likes(accountid, postid, likedate) VALUES($1,$2,now());",
      [req.session.accountid, postid],
      (err, result) => {
        if (err) {
          console.log(err.message);
          return res.json({ toggled: false });
        }

        if (result) {
          return res.json({ toggled: true, liked: true });
        }
      }
    );
  }
}

function createComment(req, res) {
  const postid = req.body.postid;
  const comment = req.body.comment;
  let replyTo;

  if (req.body.replyTo) {
    replyTo = req.body.replyTo;
  }

  pool.query(
    "INSERT INTO comments(accountid, postid, comment, commentdate, replyTo) VALUES($1,$2,$3,now(),$4);",
    [req.session.accountid, postid, comment, replyTo],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ commented: false });
      }

      if (result) {
        return res.json({ commented: true, comment: comment });
      }
    }
  );
}

module.exports = {
  createPost,
  getPosts,
  toggleLike,
  createComment,
};
