const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const checkMiddleware = require("../middlewares/checkMiddleware");

router.get("/all/:postid", commentController.getPostComments);
router.use(checkMiddleware);
router.post("/create", commentController.createComment);

module.exports = router;
