const express = require("express");
const router = express.Router();
const multer = require("../helpers/multer");
const postController = require("../controllers/postController");
const checkMiddleware = require("../middlewares/checkMiddleware");

router.use(checkMiddleware);
router.post("/upload", multer.single("formId"), postController.uploadPicture);
router.post("/create", postController.createPost);
router.get("/all", postController.getPosts);

module.exports = router;
