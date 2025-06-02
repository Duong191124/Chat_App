const authService = require("../services/auth.service.js");

const register = async (req, res) => {
  try {
    await authService.register(req.body);
    res.status(201).json({ message: "Register successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await authService.login(req.body);
    const token = authService.generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const logout = (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
};

const forgotPassword = async (req, res) => {
  try {
    await authService.forgotPassword(req.body);
    return res.status(200).json({ message: "Reset code sent check your mail" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const confirmPassword = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
};
