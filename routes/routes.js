const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get the story
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT 
                Chapters.id AS chapter_id,
                Chapters.chapter,
                Chapters.scene,
                Questions.id AS question_id,
                Questions.question,
                Choices.id AS choice_id,
                Choices.text AS choice_text,
                Consequences.text AS consequence_text,
                Consequences.inventory,
                Skills.understanding,
                Skills.supply,
                Skills.time,
                Skills.recklessness,
                Skills.injury
            FROM Chapters
            JOIN Questions ON Chapters.id = Questions.chapter_id
            JOIN Choices ON Questions.id = Choices.question_id
            LEFT JOIN Consequences ON Choices.id = Consequences.choice_id AND Questions.id = Consequences.question_id
            LEFT JOIN Skills ON Consequences.choice_id = Skills.choice_id AND Questions.id = Skills.question_id
            ORDER BY Chapters.id, Questions.id, Choices.id`);

    const chaptersMap = new Map();

    rows.forEach((row) => {
      if (!chaptersMap.has(row.chapter_id)) {
        chaptersMap.set(row.chapter_id, {
          id: row.chapter_id,
          chapter: row.chapter,
          scene: row.scene,
          question: row.question,
          choices: [],
        });
      }

      const chapter = chaptersMap.get(row.chapter_id);

      const existingChoice = chapter.choices.find(
        (choice) => choice.id === row.choice_id
      );

      if (!existingChoice) {
        const choice = {
          id: row.choice_id,
          text: row.choice_text,
          consequence: {
            text: row.consequence_text,
            skill: {},
          },
        };

        if (row.understanding)
          choice.consequence.skill.understanding = row.understanding;
        if (row.supply) choice.consequence.skill.supply = row.supply;
        if (row.time) choice.consequence.skill.time = row.time;
        if (row.recklessness)
          choice.consequence.skill.recklessness = row.recklessness;
        if (row.injury) choice.consequence.skill.injury = row.injury;

        if (row.inventory) choice.consequence.inventory = row.inventory;

        chapter.choices.push(choice);
      } else {
        // Aggregate skills if the choice already exists
        if (row.understanding)
          existingChoice.consequence.skill.understanding = row.understanding;
        if (row.supply) existingChoice.consequence.skill.supply = row.supply;
        if (row.time) existingChoice.consequence.skill.time = row.time;
        if (row.recklessness)
          existingChoice.consequence.skill.recklessness = row.recklessness;
        if (row.injury) existingChoice.consequence.skill.injury = row.injury;

        if (row.inventory) existingChoice.consequence.inventory = row.inventory;
      }
    });

    const chapters = Array.from(chaptersMap.values());

    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
