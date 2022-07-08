const pool = require("../helpers/db");

function createComment(req, res) {
  const postid = req.body.postid;
  const comment = req.body.comment;
  let replyTo;

  if (req.body.replyTo) {
    replyTo = req.body.replyTo;
  }

  if (!comment) {
    return res.json({ commented: false, message: "Comment was empty" });
  }

  pool.query(
    "INSERT INTO comments(accountid, postid, comment, commentdate, replyTo) VALUES($1,$2,$3,now(),$4);",
    [req.session.accountid, postid, comment, replyTo],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ commented: false, message: err.message });
      }

      if (result) {
        return res.json({ commented: true });
      }
    }
  );
}

function getPostComments(req, res) {
  const postid = req.params.postid;
  pool.query(
    "SELECT commentid, username, avatar, comment, commentdate FROM comments INNER JOIN account on comments.accountid = account.accountid WHERE postid = $1 ORDER BY commentid DESC;",
    [postid],
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

module.exports = { createComment, getPostComments };
