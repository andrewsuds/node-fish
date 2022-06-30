const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const { multerAvatar } = require("../helpers/multer");
const checkMiddleware = require("../middlewares/checkMiddleware");

router.get("/posts/:username", profileController.getProfilePosts);
router.use(checkMiddleware);
router.get("/activity", profileController.getActivity);
router.post(
  "/upload-avatar",
  multerAvatar.single("avatar"),
  profileController.uploadAvatar
);

module.exports = router;
