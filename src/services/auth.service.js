const jwt = require("jsonwebtoken");
const bcrypt = require("../utils/bcrypt.js");
const db = require("../models");
const generateRandom6DigitCode = require("../utils/generate.number.js");
const { sendResetMail } = require("../services/mailer.service.js");
const User = db.User;
const PasswordRequest = db.PasswordRequest;

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

const register = async ({ username, email, password }) => {
  const existingEmail = await User.findOne({ where: { email } });
  const existingUsername = await User.findOne({ where: { username } });
  if (existingEmail) throw new Error("Email already exists");
  if (existingUsername) throw new Error("Username already exists");

  const hash = await bcrypt.hashPassword(password);
  const newUser = await User.create({
    username,
    email,
    password: hash,
  });
  return newUser;
};

const login = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });
  if (!user || !user.password) throw new Error("Invalid credentials");
  const isMatch = await bcrypt.comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Not found");
  let passwordReset = user.passwordRequest;
  if (!passwordReset) {
    passwordReset = await PasswordRequest.create({
      reset_code: "000000",
      is_expired: new Date(Date.now() + 15 * 60000),
      status: true,
    });
    user.password_request_id = passwordReset.id;
    await user.save();
  }
  passwordReset.reset_code = generateRandom6DigitCode();
  passwordReset.is_expired = new Date(Date.now() + 15 * 60000);
  passwordReset.status = true;
  await passwordReset.save();
  await sendResetMail(email, passwordReset.reset_code);
};

module.exports = {
  generateToken,
  register,
  login,
  forgotPassword,
};
