const userService = require("../services/user.service");

const updateDisplayName = async (req, res) => {
  try {
    const userId = req.params.id;
    const { displayName } = req.body;

    await userService.updateDisplayName(userId, displayName);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const sendFriendRequestByName = async (req, res) => {
  const userId = req.user.id;
  const { displayName } = req.body;

  if (!displayName)
    return res.status(400).json({ message: "DisplayName is required" });

  try {
    const targetUser = await userService.findUserByDisplayName(displayName);
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    const relation = await userService.sendFriendRequest(userId, targetUser.id);
    return res.json({ message: "Friend request sent", relation });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const respondFriendRequest = async (req, res) => {
  const userId = req.user.id;
  const { requesterId, accept } = req.body;

  if (typeof accept !== "boolean" || !requesterId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    await userService.respondFriendRequest(userId, requesterId, accept);
    return res.json({
      message: accept ? "Friend request accepted" : "Friend request rejected",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getInfoProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    await userService.getInfoProfile(userId);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { displayName, email, avatarUrl } = req.body;
  try {
    await userService.updateProfile(userId, displayName, email, avatarUrl);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  updateDisplayName,
  sendFriendRequestByName,
  respondFriendRequest,
  getInfoProfile,
  updateProfile,
};
