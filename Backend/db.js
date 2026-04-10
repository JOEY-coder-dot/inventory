// db.js
const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Use promise wrapper
const db = pool.promise();

db.getConnection()
  .then((connection) => {
    console.log("DB connected!");
    connection.release();
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });

module.exports = db;