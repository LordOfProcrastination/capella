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
    const [results] = await pool.query(
      "SELECT item, isActive FROM characteritems"
    );
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

router.post("/skills", async (req, res) => {
  try {
    const { understanding, time, supplies, recklessness, injuries } = req.body;

    // Fetch current stats from the database
    const [currentStats] = await pool.query(
      "SELECT understanding, time, supplies, recklessness, injuries FROM characterstats WHERE id = 1"
    );

    if (currentStats.length === 0) {
      return res.status(404).json({ message: "Character stats not found." });
    }

    const updatedStats = {
      understanding: currentStats[0].understanding + (understanding || 0),
      time: currentStats[0].time + (time || 0),
      supplies: currentStats[0].supplies + (supplies || 0),
      recklessness: currentStats[0].recklessness + (recklessness || 0),
      injuries: currentStats[0].injuries + (injuries || 0),
    };

    // Update the stats in the database
    await pool.query(
      "UPDATE characterstats SET understanding = ?, time = ?, supplies = ?, recklessness = ?, injuries = ? WHERE id = 1",
      [
        updatedStats.understanding,
        updatedStats.time,
        updatedStats.supplies,
        updatedStats.recklessness,
        updatedStats.injuries,
      ]
    );

    res.status(200).json({ message: "Character stats updated successfully." });
  } catch (error) {
    console.error("Error updating character stats:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Update character items
router.post("/items", async (req, res) => {
  try {
    const { item, isActive } = req.body;

    if (!item) {
      return res.status(400).json({ message: "Item is required." });
    }

    console.log("Received item:", item, "isActive:", isActive);

    // Insert new item
    await pool.query(
      "INSERT INTO characteritems (item, isActive, id) VALUES (?, ?, 1)",
      [item, isActive]
    );

    res.status(200).json({ message: "Character item added successfully." });
  } catch (error) {
    console.error("Error updating character items:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
// Update character allies
router.post("/allies", async (req, res) => {
  try {
    const { ally } = req.body;

    if (!ally) {
      return res.status(400).json({ message: "Ally is required." });
    }

    console.log("Received ally:", ally);

    // Insert new ally
    await pool.query("INSERT INTO characterallies (ally) VALUES (?)", [ally]);

    res.status(200).json({ message: "Character ally added successfully." });
  } catch (error) {
    console.error("Error updating character allies:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
