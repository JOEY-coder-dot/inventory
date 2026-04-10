const jwt = require("jsonwebtoken");

exports.generateResetToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

exports.verifyResetToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};