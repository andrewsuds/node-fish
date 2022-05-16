const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const checkMiddleware = require("../middlewares/checkMiddleware");
const multer = require("../helpers/multer");

router.use(checkMiddleware);
router.post("/create", multer.single("formId"), postController.createPost);

module.exports = router;
