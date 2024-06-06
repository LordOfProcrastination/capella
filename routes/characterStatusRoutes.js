const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all skills
router.get("/skills", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT understanding, time, supplies, recklessness, injuries FROM characterstats"
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get all items
router.get("/items", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT item FROM characteritems");
    res.json(results);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get all allies
router.get("/allies", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT ally FROM characterallies");
    res.json(results);
  } catch (error) {
    console.error("Error fetching allies:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
