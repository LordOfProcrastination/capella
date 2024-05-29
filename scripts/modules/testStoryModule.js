const EriksAdventureModule = (() => {
  const chapters = [
    {
      chapterNumber: 1,
      chapter: "Chapter 1",
      scene: "Scene 1",
      question: "question1",
      stats: {
        understanding: 0,
        time: 2,
        supply: 5,
        recklessness: 0,
      },
      choices: {
        a: {
          text: "answer1a",
          consequence: "consequence1a",
          effect: {
            understanding: 1,
          },
        },
        b: {
          text: "answer1b",
          consequence: "consequence1b",
          effect: {
            supply: 1,
            time: -1,
          },
        },
        c: {
          text: "answer1c",
          consequence: "consequence1c",
          effect: {
            magicalCharm: true,
          },
        },
        d: {
          text: "answer1d",
          consequence: "consequence1d",
          effect: {
            time: 1,
            recklessness: 1,
          },
        },
      },
    },
    {
      chapterNumber: 2,
      chapter: "Chapter 2",
      scene: "Scene 2",
      question: "question2",
      choices: {
        a: {
          text: "answer2a",
          consequence: "consequence2a",
          effect: {
            time: -1,
            injury: 1,
          },
        },
        b: {
          text: "answer2b",
          consequence: "consequence2b",
          effect: {
            understanding: 2,
          },
        },
        c: {
          text: "answer2c",
          consequence: "consequence2c",
          effect: {
            recklessness: 1,
            supply: 1,
          },
        },
        d: {
          text: "answer2d",
          consequence: "consequence2d",
          effect: {
            supply: -1,
            ally: "woodlandCreature",
          },
        },
      },
    },
    {
      chapterNumber: 3,
      chapter: "Chapter 3",
      scene: "Scene 3",
      question: "question3",
      choices: {
        a: {
          text: "answer3a",
          consequence: "consequence3a",
          effect: {
            supply: -1,
            understanding: 1,
          },
        },
        b: {
          text: "answer3b",
          consequence: "consequence3b",
          effect: {
            injury: 1,
            understanding: 3,
          },
        },
        c: {
          text: "answer3c",
          consequence: "consequence3c",
          effect: {
            trollHelp: true,
            understanding: 2,
          },
        },
        d: {
          text: "answer3d",
          consequence: "consequence3d",
          effect: {
            time: -1,
            understanding: 1,
          },
        },
      },
    },
    {
      chapterNumber: 4,
      chapter: "Chapter 4",
      scene: "Scene 4",
      question: "question4",
      choices: {
        a: {
          text: "answer4a",
          consequence: "consequence4a",
          effect: {
            time: -1,
            understanding: 1,
          },
        },
        b: {
          text: "answer4b",
          consequence: "consequence4b",
          effect: {
            time: 1,
            recklessness: 1,
          },
        },
        c: {
          text: "answer4c",
          consequence: "consequence4c",
          effect: {
            // Conditional logic to be handled in the game
          },
        },
        d: {
          text: "answer4d",
          consequence: "consequence4d",
          effect: {
            time: 2,
            injury: 2, // Adjusted if he has troll or woodland spirit
          },
        },
      },
    },
    {
      chapterNumber: 5,
      chapter: "Chapter 5",
      scene: "Scene 5",
      question: "question5",
      choices: {
        a: {
          text: "answer5a",
          consequence: "consequence5a",
          effect: {
            // Complex conditional logic for ending based on injury, time, and recklessness
          },
        },
        b: {
          text: "answer5b",
          consequence: "consequence5b",
          effect: {
            // Conditional logic based on troll, time, and recklessness
          },
        },
        c: {
          text: "answer5c",
          consequence: "consequence5c",
          effect: {
            // Success if magical charm is available
          },
        },
        d: {
          text: "answer5d",
          consequence: "consequence5d",
          effect: {
            // Conditional logic based on woodland spirit or understanding
          },
        },
      },
    },
  ];

  const getById = (id) => {
    return structuredClone(chapters);
  };

  return {
    getById,
  };
})();

// Export the object
export default EriksAdventureModule;
