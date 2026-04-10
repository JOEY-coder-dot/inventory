// models/inventory.js
const db = require("../db");

// CREATE new inventory item
exports.create = async ({ date, cs, model, color, year, location }) => {
  const [result] = await db.execute(
    "INSERT INTO inventory (date, cs, model, color, year, location) VALUES (?, ?, ?, ?, ?, ?)",
    [date, cs, model, color, year, location]
  );
  return { id: result.insertId, date, cs, model, color, year, location };
};

// GET all inventory items
exports.findAll = async () => {
  const [rows] = await db.execute(`
    SELECT 
      DATE_FORMAT(date, '%Y-%m-%d') AS date,
      DATE_FORMAT(posteddate, '%Y-%m-%d') AS posteddate,
      cs,
      model,
      color,
      year,
      location
    FROM inventory
  `);
  return rows;
};

// GET single item by CS
exports.findByCs = async (cs) => {
  const [rows] = await db.execute("SELECT * FROM inventory WHERE cs = ?", [cs]);
  return rows[0];
};

// UPDATE item
exports.update = async (cs, { date, posteddate, model, color, year, location, chassisnum, enginenum, keynum, weight, vsp }) => {
  await db.execute(
    `UPDATE inventory 
     SET date=?, posteddate=?, model=?, color=?, year=?, location=?, 
         chassisnum=?, enginenum=?, keynum=?, weight=?, vsp=? 
     WHERE cs=?`,
    [date, posteddate, model, color, year, location, chassisnum, enginenum, keynum, weight, vsp, cs]
  );
  return { cs, date, posteddate, model, color, year, location, chassisnum, enginenum, keynum, weight, vsp };
};

// DELETE item
exports.remove = async (cs) => {
  await db.execute("DELETE FROM inventory WHERE cs=?", [cs]);
  return { message: "Item deleted", cs };
};