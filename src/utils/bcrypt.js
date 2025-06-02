const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

const comparePassword = async (password, passwordInStore) => {
  return await bcrypt.compare(password, passwordInStore);
};

module.exports = {
  hashPassword,
  comparePassword,
};
