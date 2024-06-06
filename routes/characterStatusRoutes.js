const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all skills
router.get("/skills", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT understanding, time, supplies, recklessness, injuries FROM characterstats WHERE id = 1"
    );
    console.log("Fetched character stats:", results[0]);
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

    console.log("Current Stats from DB:", currentStats[0]);
    console.log("Received Update Data:", req.body);

    // Calculate the updated stats by adding incoming values to the current stats
    console.log("Updated Stats to be Saved:", req.body);

    // Update the stats in the database
    await pool.query(
      "UPDATE characterstats SET understanding = ?, time = ?, supplies = ?, recklessness = ?, injuries = ? WHERE id = 1",
      [
        req.body.understanding,
        req.body.time,
        req.body.supplies,
        req.body.recklessness,
        req.body.injuries,
      ]
    );

    // Fetch updated stats to confirm the update
    const [newStats] = await pool.query(
      "SELECT understanding, time, supplies, recklessness, injuries FROM characterstats WHERE id = 1"
    );

    console.log("Newly Fetched Stats from DB:", newStats[0]);

    res.status(200).json({
      message: "Character stats updated successfully.",
      newStats: newStats[0],
    });
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
