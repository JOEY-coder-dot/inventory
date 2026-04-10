const db = require("../db");

// Get all customers
exports.findAll = async () => {
  const [rows] = await db.execute(`
    SELECT vsi, vsp, reservationtype, customercode, customername,
           customeraddress, mpname, srp
    FROM customers
  `);
  return rows;
};

// Get single customer by VSP
exports.findByVsp = async (vsp) => {
  const [customerRows] = await db.execute(
    `SELECT vsi, vsp, reservationtype, customercode, customername,
            customeraddress, mpname, srp
     FROM customers WHERE vsp = ?`,
    [vsp]
  );

  const [inventoryRows] = await db.execute(
    `SELECT DATE_FORMAT(date, '%Y-%m-%d') AS date, cs, model, color, year, location
     FROM inventory WHERE vsp = ?`,
    [vsp]
  );

  return { ...customerRows[0], inventory: inventoryRows };
};

// Create new customer
exports.create = async (data) => {
  const { vsi, vsp, reservationtype, customercode, customername,
          customeraddress, mpname, srp } = data;

  const [result] = await db.execute(
    `INSERT INTO customers 
      (vsi, vsp, reservationtype, customercode, customername, customeraddress, mpname, srp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [vsi, vsp, reservationtype, customercode, customername, customeraddress, mpname, srp]
  );

  return { id: result.insertId, ...data };
};

// Update customer
exports.update = async (vsp, data) => {
  const { vsi, reservationtype, customercode, customername,
          customeraddress, mpname, srp } = data;

  await db.execute(
    `UPDATE customers SET 
      vsi = ?, reservationtype = ?, customercode = ?, customername = ?, 
      customeraddress = ?, mpname = ?, srp = ?
     WHERE vsp = ?`,
    [vsi, reservationtype, customercode, customername, customeraddress, mpname, srp, vsp]
  );

  return { vsp, ...data };
};

// Delete customer
exports.remove = async (vsp) => {
  await db.execute(`DELETE FROM customers WHERE vsp = ?`, [vsp]);
  return { message: `Customer ${vsp} deleted` };
};
