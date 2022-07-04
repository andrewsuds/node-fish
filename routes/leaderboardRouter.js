const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");
const checkMiddleware = require("../middlewares/checkMiddleware");

router.get("/total-weight/:hours", leaderboardController.getTotalWeight);
router.get("/total-caught/:hours", leaderboardController.getTotalCaught);
router.get("/biggest/:hours", leaderboardController.getBiggest);
router.get("/smallest/:hours", leaderboardController.getSmallest);
router.get("/longest/:hours", leaderboardController.getLongest);
module.exports = router;
