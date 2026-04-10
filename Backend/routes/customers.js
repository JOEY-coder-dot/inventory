const express = require("express");
const Customers = require("../models/customers"); // your DB model
const router = express.Router();

// GET all customers
router.get("/", async (req, res) => {
  try {
    const items = await Customers.findAll();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET single customer by VSP
router.get("/:vsp", async (req, res) => {
  try {
    const item = await Customers.findByVsp(req.params.vsp);
    if (!item) return res.status(404).json({ message: "Customer not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE new customer
router.post("/", async (req, res) => {
  try {
    const newItem = await Customers.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE customer
router.put("/:vsp", async (req, res) => {
  try {
    const updatedItem = await Customers.update(req.params.vsp, req.body);
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE customer
router.delete("/:vsp", async (req, res) => {
  try {
    const result = await Customers.remove(req.params.vsp);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;