const generateRandom6DigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = generateRandom6DigitCode;
