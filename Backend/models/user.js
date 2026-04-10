// models/user.js
const db = require("../db");

// CREATE USER
exports.create = async ({ username, email, password }) => {
  const [result] = await db.execute(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );
  return { id: result.insertId, username, email };
};

// FIND USER BY USERNAME
exports.findByUsername = async (username) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
  return rows[0];
};

// FIND USER BY EMAIL
exports.findByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

// FIND USER BY ID
exports.findById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

// SAVE RESET TOKEN + EXPIRY
exports.saveResetToken = async (email, token, expiry) => {
  await db.execute(
    "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
    [token, expiry, email]
  );
};

// FIND USER BY RESET TOKEN
exports.findByResetToken = async (token) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE reset_token = ?", [token]);
  return rows[0];
};

// UPDATE PASSWORD AND CLEAR RESET TOKEN
exports.updatePassword = async (id, hashedPassword) => {
  await db.execute(
    "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
    [hashedPassword, id]
  );
};