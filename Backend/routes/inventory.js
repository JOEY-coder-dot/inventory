// routes/inventory.js
const express = require("express");
const Inventory = require("../models/inventory");

const router = express.Router();

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Inventory.findAll();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET single item by CS
router.get("/:cs", async (req, res) => {
  try {
    const item = await Inventory.findByCs(req.params.cs);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE new item
router.post("/", async (req, res) => {
  try {
    const newItem = await Inventory.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE item
router.put("/:cs", async (req, res) => {
  try {
    const updatedItem = await Inventory.update(req.params.cs, req.body);
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE item
router.delete("/:cs", async (req, res) => {
  try {
    const result = await Inventory.remove(req.params.cs);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;