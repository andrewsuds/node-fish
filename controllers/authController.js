const pool = require("../helpers/db");
const bcrypt = require("bcrypt");

function attemptRegister(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.json({ registered: false, message: "Error in registration" });
    }

    pool.query(
      "INSERT INTO account(name, email, username, password) VALUES($1, $2, $3, $4);",
      [name, email, username, hash],
      (err, result) => {
        if (err) {
          console.log(err.message);
          return res.json({ registered: false, message: err.message });
        }
        if (result) {
          return res.json({
            registered: true,
            message: "Success! You can now log in.",
          });
        }
      }
    );
  });
}

async function attemptLogin(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const potentialLogin = await pool.query(
    "SELECT password, accountid, username, avatar FROM account WHERE username = $1;",
    [username]
  );

  if (potentialLogin.rowCount == 0) {
    return res.json({
      loggedIn: false,
      message: "Incorrect username or password - This means no account found",
    });
  }

  const samePass = await bcrypt.compare(
    password,
    potentialLogin.rows[0].password
  );

  if (samePass) {
    req.session.accountid = potentialLogin.rows[0].accountid;
    req.session.username = potentialLogin.rows[0].username;
    req.session.avatar = potentialLogin.rows[0].avatar;
    return res.json({
      loggedIn: true,
      username: potentialLogin.rows[0].username,
      avatar: potentialLogin.rows[0].avatar,
    });
  } else {
    return res.json({
      loggedIn: false,
      message: "Incorrect username or password",
    });
  }
}

function checkLogin(req, res) {
  if (!req.session || !req.session.accountid) {
    return res.json({ loggedIn: false });
  } else {
    return res.json({
      loggedIn: true,
      username: req.session.username,
      avatar: req.session.avatar,
    });
  }
}

module.exports = { attemptRegister, attemptLogin, checkLogin };
