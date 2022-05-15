// DECLARATIONS
const express = require("express");
const cors = require("cors");
const { Pool, types } = require("pg");
const bcrypt = require("bcrypt");
const session = require("express-session");
const multer = require("multer");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
});
const upload = multer({ storage: storage });

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(
  session({
    name: "sessionId",
    secret: "thisIsMySecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 366,
    },
  })
);

const port = process.env.PORT || 3001;
// DATABASE
const pool = new Pool({
  connectionString:
    process.env.PRODUCTION === "true"
      ? process.env.INTERNAL
      : process.env.EXTERNAL,
  ssl: process.env.PRODUCTION === "true" ? false : true,
});

// REGISTER
app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.json("Error with creating hash");
    }

    pool.query(
      "INSERT INTO account(name, email, username, password) VALUES($1, $2, $3, $4);",
      [name, email, username, hash],
      (err, result) => {
        if (err) {
          console.log(err.message);
          return res.json({ message: err.message });
        }
        if (result) {
          return res.json({ message: "Success" });
        }
      }
    );
  });
});

// LOGIN
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const potentialLogin = await pool.query(
    "SELECT accountid, username, password FROM account WHERE username = $1;",
    [username]
  );

  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(
      password,
      potentialLogin.rows[0].password
    );

    if (isSamePass) {
      req.session.accountid = potentialLogin.rows[0].accountid;
      req.session.username = potentialLogin.rows[0].username;
      return res.json({
        message: "Logged In: " + potentialLogin.rows[0].accountid,
      });
    } else {
      return res.json({ message: "Incorrect username or password" });
    }
  } else {
    return res.json({
      message: "Incorrect username or password - This means no account found",
    });
  }
});

app.get("/images/:image", (req, res) => {
  const image = req.params.image;
  res.sendFile("C:/Users/andre/Desktop/fish/server/images/" + image);
});

app.use((req, res, next) => {
  if (!req.session || !req.session.accountid) {
    return res.json({ loggedIn: false });
  }
  next();
});

app.get("/login", (req, res) => {
  if (req.session.username) {
    return res.json({ loggedIn: true, message: req.session.accountid });
  } else {
    return res.json({ loggedIn: false });
  }
});

app.post("/create", (req, res) => {
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
});

app.post("/uploadImage", upload.single("formId"), (req, res) => {
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
});

// RUN APP
app.listen(port, () => {
  console.log("Server running");
});
