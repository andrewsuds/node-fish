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
    origin: [
      "https://fish.aks22.com",
      "https://fishbucket.aks22.com",
      "https://react-fish-two.vercel.app",
      "http://localhost:3000",
    ],
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
    name: "sessionId",
    secret: "thisIsMySecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.PRODUCTION == "true" ? true : false,
      domain: process.env.PRODUCTION == "true" ? ".aks22.com" : "localhost",
      expires: 1000 * 60 * 60 * 24 * 365,
    },
  })
);

// ROUTES
const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
const profileRouter = require("./routes/profileRouter");
const leaderboardRouter = require("./routes/leaderboardRouter");
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/profile", profileRouter);
app.use("/leaderboard", leaderboardRouter);

// SERVE IMAGES & AVATARS
app.use(express.static("./public"));

// RUN APP
app.listen(process.env.PORT || 3001, () => {
  console.log("Server running");
});
