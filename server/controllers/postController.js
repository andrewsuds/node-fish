const pool = require("../helpers/db");

function createPost(req, res) {
  const weight = req.body.weight;
  const length = req.body.length;
  const location = req.body.location;
  const picture = req.file.filename;
  const caption = req.body.caption;
  const speciesid = req.body.speciesid;
  const accountid = req.session.accountid;

  pool.query(
    "INSERT INTO post(weight, length, location, picture, caption, speciesid, accountid) VALUES($1,$2,$3,$4,$5,$6,$7);",
    [weight, length, location, picture, caption, speciesid, accountid],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ message: err.message });
      }
      if (result) {
        return res.json({ message: "Successfully posted!" });
      }
    }
  );
}

module.exports = { createPost };
