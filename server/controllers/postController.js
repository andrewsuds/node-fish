const pool = require("../helpers/db");
const exif = require("../helpers/exif");

async function uploadPicture(req, res) {
  const filename = await req.file.filename;

  const coordinates = exif.getGPS(filename);

  return res.json({
    message: "Image succesfully uploaded!",
    filename: filename,
    location: coordinates,
  });
}

function createPost(req, res) {
  const weight = req.body.weight;
  const length = req.body.length;
  const location = req.body.location;
  const picture = req.body.picture;
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

function getPosts(req, res) {
  pool.query(
    "SELECT postid, username, species, weight, length, caption, picture, location FROM post INNER JOIN account on post.accountid = account.accountid INNER JOIN species on post.speciesid = species.speciesid ORDER BY postid DESC;",
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

module.exports = { uploadPicture, createPost, getPosts };
