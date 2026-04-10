const db = require("../db");

// GET
exports.getAll = (req, res) => {
  db.query("SELECT * FROM inventory", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// CREATE
exports.create = (req, res) => {
  const { date, cs, model, color, year, location } = req.body;

  const sql =
    "INSERT INTO inventory (date, cs, model, color, year, location) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [date, cs, model, color, year, location], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Created" });
  });
};

// UPDATE
exports.update = (req, res) => {
  const { cs } = req.params;
  const { date, model, color, year, location } = req.body;

  const sql =
    "UPDATE inventory SET date=?, model=?, color=?, year=?, location=? WHERE cs=?";

  db.query(sql, [date, model, color, year, location, cs], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated" });
  });
};

// DELETE
exports.remove = (req, res) => {
  const { cs } = req.params;

  db.query("DELETE FROM inventory WHERE cs=?", [cs], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
};