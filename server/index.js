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
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    name: "sessionId",
    secret: "thisIsMySecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      expires: 1000 * 60 * 60,
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
