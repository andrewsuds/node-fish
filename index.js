// DECLARATIONS
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pool = require("./helpers/db");
const pgSession = require("connect-pg-simple")(session);
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://fishbucket.netlify.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    name: "sessId",
    secret: "thisIsMySecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 365,
    },
  })
);

// ROUTES
const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");
app.use("/auth", authRouter);
app.use("/post", postRouter);

// SERVE IMAGES
app.use(express.static("public"));

// RUN APP
app.listen(process.env.PORT || 3001, () => {
  console.log("Server running");
});
