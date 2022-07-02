const express = require("express");
const router = express.Router();
const { multerImage } = require("../helpers/multer");
const postController = require("../controllers/postController");
const checkMiddleware = require("../middlewares/checkMiddleware");

router.get("/one/:postid", postController.getOnePost);
router.get("/all", postController.getPosts);
router.get("/species", postController.getSpecies);
router.use(checkMiddleware);
router.post("/like", postController.toggleLike);
router.post("/delete", postController.deletePost);
router.post(
  "/create",
  multerImage.single("picture"),
  postController.createPost
);

module.exports = router;
