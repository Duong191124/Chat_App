const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/:id/profile", authMiddleware, userController.getInfoProfile);

router.patch(
  "/:id/display-name",
  authMiddleware,
  userController.updateDisplayName
);

router.patch(
  "/:id/update-profile",
  authMiddleware,
  userController.updateProfile
);

router.post(
  "/friend-request",
  authMiddleware,
  userController.sendFriendRequestByName
);
router.post(
  "/friend-request/respond",
  authMiddleware,
  userController.respondFriendRequest
);

module.exports = router;
