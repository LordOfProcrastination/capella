const express = require("express");
const router = express.Router();
const pool = require("../db"); // Ensure this points to your MySQL pool configuration

// Get the story
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        Chapters.id AS chapter_id,
        Chapters.chapter,
        Chapters.scene,
        Questions.id AS question_id,
        Questions.question,
        Choices.id AS choice_id,
        Choices.text AS choice_text,
        Consequences.text AS consequence_text,
        Skills.understanding,
        Skills.supply,
        Skills.time,
        Skills.recklessness,
        Skills.injury,
        Allies.allies,
        Items.item
      FROM Chapters
      JOIN Questions ON Chapters.id = Questions.chapter_id
      JOIN Choices ON Questions.id = Choices.question_id
      LEFT JOIN Consequences ON Choices.id = Consequences.choice_id AND Questions.id = Consequences.question_id
      LEFT JOIN Skills ON Consequences.choice_id = Skills.choice_id AND Questions.id = Skills.question_id
      LEFT JOIN Allies ON Consequences.choice_id = Allies.choice_id AND Questions.id = Allies.question_id
      LEFT JOIN Items ON Consequences.choice_id = Items.choice_id AND Questions.id = Items.question_id
      ORDER BY Chapters.id, Questions.id, Choices.id
    `);

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
            skill: {
              understanding: row.understanding,
              supply: row.supply,
              time: row.time,
              recklessness: row.recklessness,
              injury: row.injury,
            },
          },
        };

        if (row.allies) choice.consequence.ally = row.allies;
        if (row.item) choice.consequence.item = row.item;

        chapter.choices.push(choice);
      } else {
        // Aggregate skills if the choice already exists
        if (row.understanding !== null)
          existingChoice.consequence.skill.understanding = row.understanding;
        if (row.supply !== null)
          existingChoice.consequence.skill.supply = row.supply;
        if (row.time !== null) existingChoice.consequence.skill.time = row.time;
        if (row.recklessness !== null)
          existingChoice.consequence.skill.recklessness = row.recklessness;
        if (row.injury !== null)
          existingChoice.consequence.skill.injury = row.injury;
      }
    });

    const chapters = Array.from(chaptersMap.values());

    res.json(chapters);
  } catch (err) {
    console.error("Error fetching story:", err); // Log the error
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  const chapterId = req.params.id;

  try {
    const [rows] = await pool.query(
      `
      SELECT 
        Chapters.id AS chapter_id,
        Chapters.chapter,
        Chapters.scene,
        Questions.id AS question_id,
        Questions.question,
        Choices.id AS choice_id,
        Choices.text AS choice_text,
        Consequences.text AS consequence_text,
        Skills.understanding,
        Skills.supply,
        Skills.time,
        Skills.recklessness,
        Skills.injury,
        Allies.allies,
        Items.item
      FROM Chapters
      JOIN Questions ON Chapters.id = Questions.chapter_id
      JOIN Choices ON Questions.id = Choices.question_id
      LEFT JOIN Consequences ON Choices.id = Consequences.choice_id AND Questions.id = Consequences.question_id
      LEFT JOIN Skills ON Consequences.choice_id = Skills.choice_id AND Questions.id = Skills.question_id
      LEFT JOIN Allies ON Consequences.choice_id = Allies.choice_id AND Questions.id = Allies.question_id
      LEFT JOIN Items ON Consequences.choice_id = Items.choice_id AND Questions.id = Items.question_id
      WHERE Chapters.id = ?
      ORDER BY Chapters.id, Questions.id, Choices.id
    `,
      [chapterId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    const chapter = {
      id: rows[0].chapter_id,
      chapter: rows[0].chapter,
      scene: rows[0].scene,
      question: rows[0].question,
      choices: [],
    };

    rows.forEach((row) => {
      const choice = {
        id: row.choice_id,
        text: row.choice_text,
        consequence: {
          text: row.consequence_text,
          skill: {
            understanding: row.understanding,
            supplies: row.supply,
            time: row.time,
            recklessness: row.recklessness,
            injuries: row.injury,
          },
          ally: row.allies,
          item: row.item,
        },
      };

      chapter.choices.push(choice);
    });

    res.json(chapter);
  } catch (err) {
    console.error("Error fetching specific chapter:", err); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
