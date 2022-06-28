const express = require("express");
const router = express.Router();
const multer = require("../helpers/multer");
const postController = require("../controllers/postController");
const checkMiddleware = require("../middlewares/checkMiddleware");

router.get("/one/:postid", postController.getOnePost);
router.get("/all", postController.getPosts);
router.get("/profile/:username", postController.getProfilePosts);
router.get("/comments/:postid", postController.getPostComments);
router.get("/species", postController.getSpecies);
router.use(checkMiddleware);
router.post("/create", multer.single("picture"), postController.createPost);
router.post("/like", postController.toggleLike);
router.post("/comment", postController.createComment);

module.exports = router;
