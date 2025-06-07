const db = require("../models");
const User = db.User;
const Relationship = db.Relationship;

const updateDisplayName = async (userId, displayName) => {
  if (!displayName || displayName.trim() === "") {
    throw new Error("Display name is required");
  }

  await User.update({ displayName }, { where: { id: userId } });

  const updatedUser = await User.findByPk(userId);
  return updatedUser;
};

const updateProfile = async (userId, displayName, email, avatar_url) => {
  if (displayName.trim() === "" || email.trim() === "") {
    throw new Error("not null");
  }
  await User.update(
    { displayName, email, avatar_url },
    { where: { id: userId } }
  );

  const updatedUser = await User.findByPk(userId);
  return updatedUser;
};

const findUserByDisplayName = async (displayName) => {
  return await User.findOne({ where: { displayName } });
};

const sendFriendRequest = async (userId, targetUserId) => {
  if (userId === targetUserId)
    throw new Error("Cannot send friend request to yourself");

  const [relation, created] = await Relationship.findOrCreate({
    where: { userId, targetUserId },
    defaults: { status: "pending" },
  });

  if (!created) {
    if (relation.status === "blocked") {
      throw new Error("You have blocked this user.");
    }
    if (relation.status === "friend") {
      throw new Error("You are already friends.");
    }
    if (relation.status === "pending") {
      throw new Error("Friend request already sent.");
    }
  }

  return relation;
};

const respondFriendRequest = async (userId, requesterId, accept) => {
  const relation = await Relationship.findOne({
    where: { userId: requesterId, targetUserId: userId, status: "pending" },
  });

  if (!relation) throw new Error("No pending friend request found.");

  if (accept) {
    await Relationship.update(
      { status: "friend" },
      {
        where: {
          userId: requesterId,
          targetUserId: userId,
        },
      }
    );
    await Relationship.findOrCreate({
      where: { userId, targetUserId: requesterId },
      defaults: { status: "friend" },
    });
  } else {
    await relation.destroy();
  }
};

const getInfoProfile = async (userId) => {
  return User.findOne({ where: { id: userId } });
};

module.exports = {
  updateDisplayName,
  findUserByDisplayName,
  sendFriendRequest,
  respondFriendRequest,
  getInfoProfile,
  updateProfile,
};
