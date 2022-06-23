const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.attemptRegister);

router
  .route("/login")
  .post(authController.attemptLogin)
  .get(authController.checkLogin);

module.exports = router;
