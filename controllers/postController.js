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
    "INSERT INTO post(weight, length, location, picture, caption, speciesid, accountid, postdate) VALUES($1,$2,$3,$4,$5,$6,$7,now());",
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

function getOnePost(req, res) {
  const postid = req.params.postid;
  pool.query(
    `SELECT postid, username, species, weight, length, caption, picture, location, postdate,
    (select count(likes) as likecount from likes where postid = post.postid),
    (select count(comments) as commentcount from comments where post.postid = postid),
    (select count(likes) as isliked from likes where postid = post.postid AND accountid = $1)
    FROM post
    INNER JOIN account on post.accountid = account.accountid
    INNER JOIN species on post.speciesid = species.speciesid
    WHERE postid = $2
    ORDER BY postid DESC;`,
    [req.session.accountid, postid],
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

function getPosts(req, res) {
  pool.query(
    `SELECT postid, username, species, weight, length, caption, picture, location, postdate,
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

function toggleLike(req, res) {
  const postid = req.body.postid;
  const isliked = req.body.isliked;

  if (isliked == 1) {
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

  if (isliked == 0) {
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

function getSpecies(req, res) {
  pool.query("SELECT * FROM species;", (err, result) => {
    if (err) {
      console.log(err.message);
      return res.json({ message: err.message });
    }

    if (result) {
      return res.json(result.rows);
    }
  });
}

async function deletePost(req, res) {
  const postid = req.body.postid;
  try {
    const postAccount = await pool.query(
      "SELECT accountid FROM post WHERE postid = $1;",
      [postid]
    );

    if (postAccount.rows[0].accountid != req.session.accountid) {
      return res.json({
        deleted: false,
        message: "Not authorized to delete this post!",
      });
    }
    await pool.query("DELETE FROM comments WHERE postid = $1;", [postid]);
    await pool.query("DELETE FROM likes WHERE postid = $1;", [postid]);
    await pool.query("DELETE FROM post WHERE postid = $1;", [postid]);
    return res.json({ deleted: true });
  } catch (err) {
    console.log(err);
    return res.json({
      deleted: false,
      message: "Error deleting post. Try again.",
    });
  }
}

module.exports = {
  getOnePost,
  getPosts,
  createPost,
  toggleLike,
  getSpecies,
  deletePost,
};
