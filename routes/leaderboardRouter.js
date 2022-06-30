const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");
const checkMiddleware = require("../middlewares/checkMiddleware");

router.get("/total-weight", leaderboardController.getTotalWeight);
router.get("/total-caught", leaderboardController.getTotalCaught);
router.get("/biggest", leaderboardController.getBiggest);
router.get("/smallest", leaderboardController.getSmallest);
router.get("/longest", leaderboardController.getLongest);
module.exports = router;
