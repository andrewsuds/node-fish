const express = require("express");
const router = express.Router();
const multer = require("../helpers/multer");
const postController = require("../controllers/postController");
const checkMiddleware = require("../middlewares/checkMiddleware");

router.get("/all", postController.getPosts);
router.use(checkMiddleware);
router.post("/create", multer.single("picture"), postController.createPost);
router.post("/like", postController.toggleLike);
router.post("/comment", postController.createComment);

module.exports = router;
