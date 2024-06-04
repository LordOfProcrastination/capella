//WORK IN PROGRESS.

const EriksAdventureTxtModule = (() => {
  const chapters = [
    {
      id: 1,
      chapter: "Chapter 1: The Mysterious Map",
      scene:
        "As Erik prepared for his journey, the village elder handed him a mysterious map. The map was said to guide him to the Horn of Jotunheim, hidden deep within the treacherous mountains.",
      question: "What does Erik do first?",
      choices: [
        {
          id: "a",
          text: "Study the map carefully before setting off.",
          consequence: {
            text: "Erik gains a deeper understanding of the terrain, helping him navigate better later.",
            skill: {
              understanding: 1,
            },
          },
        },
        {
          id: "b",
          text: "Gather supplies and provisions from the village.",
          consequence: {
            text: "Erik has more resources for the journey but spends more time preparing.",
            skill: {
              supply: 1,
              time: -1,
            },
          },
        },
        {
          id: "c",
          text: "Seek advice from the elder about the journey ahead.",
          consequence: {
            text: "Erik receives a magical charm that may aid him.",
            inventory: "Magical Charm",
          },
        },
        {
          id: "d",
          text: "Leave immediately, relying on his instincts.",
          consequence: {
            text: "Erik starts quickly but lacks preparation.",
            skill: {
              time: 1,
              recklessness: 1,
            },
          },
        },
      ],
    },
    {
      id: 2,
      chapter: "Chapter 2: The Enchanted Forest",
      scene:
        "Following the path marked on the map, Erik enters the heart of an enchanted forest, where the trees whisper secrets and shadows dance mysteriously.",
      question: "How does Erik navigate the forest?",
      choices: [
        {
          id: "a",
          text: "Follow the path marked on the map.",
          consequence: {
            text: "Erik stays on course but encounters traps.",
            skill: {
              time: -1,
              injury: 1,
            },
          },
        },
        {
          id: "b",
          text: "Listen to the whispers of the trees for guidance.",
          consequence: {
            text: "Erik avoids traps but may be led into danger.",
            skill: {
              understanding: 2,
            },
          },
        },
        {
          id: "c",
          text: "Use his intuition to find the way.",
          consequence: {
            text: "Erik's path is unpredictable, leading to both opportunities and risks.",
            skill: {
              recklessness: 1,
              supply: 1,
            },
          },
        },
        {
          id: "d",
          text: "Seek help from a woodland creature he encounters.",
          consequence: {
            text: "Erik gains an ally in the creature but must share his provisions.",
            skill: {
              supply: -1,
            },
            ally: "woodland creature",
          },
        },
      ],
    },
    {
      id: 3,
      chapter: "Chapter 3: The Bridge of Trolls",
      scene:
        "After days of travel through the forest, Erik arrives at a rickety old bridge guarded by two menacing trolls. The trolls demand a toll for safe passage.",
      question: "How does Erik deal with the trolls?",
      choices: [
        {
          id: "a",
          text: "Offer them a portion of his provisions.",
          consequence: {
            text: "Erik secures safe passage but reduces his supplies.",
            skill: {
              supply: -1,
              understanding: 1,
            },
          },
        },
        {
          id: "b",
          text: "Challenge them to a battle.",
          consequence: {
            text: "Erik defeats the trolls, gaining their respect but sustaining injuries.",
            skill: {
              injury: 2,
              recklessness: 3,
            },
          },
        },
        {
          id: "c",
          text: "Attempt to trick them with a riddle.",
          consequence: {
            text: "Erik outsmarts the trolls, gaining safe passage and their help.",
            skill: {
              understanding: 2,
            },
            ally: "troll",
          },
        },
        {
          id: "d",
          text: "Find another way around the bridge.",
          consequence: {
            text: "Erik finds a longer but safer route, delaying his journey.",
            skill: {
              time: -1,
              understanding: 1,
              supply: -1,
              recklessness: -1,
            },
          },
        },
      ],
    },
    {
      id: 4,
      chapter: "Chapter 4: The Mountain Pass",
      scene:
        "Having crossed the bridge, Erik faces the steep and perilous climb up the Mountain of Giants, where the Horn of Jotunheim is said to be hidden.",
      question: "How does Erik approach the climb?",
      choices: [
        {
          id: "a",
          text: "Climb carefully and methodically.",
          consequence: {
            text: "Erik conserves energy but takes longer to reach the top.",
            skill: {
              understanding: 1,
              recklessness: -1,
            },
          },
        },
        {
          id: "b",
          text: "Look for hidden paths and shortcuts.",
          consequence: {
            text: "Erik reaches the summit faster but he stubbed his toes.",
            skill: {
              time: 1,
              recklessness: 1,
              injury: 1,
            },
          },
        },
        {
          id: "c",
          text: "Take a longer and safer route up the mountain.",
          consequence: {
            text: "Erik meets a dwarf on the way that gives him valuable guidance.",
            skill: {
              understanding: 2,
              time: -1,
            },
          },
        },
        {
          id: "d",
          text: "Rely on his strength and endurance to scale the mountain.",
          consequence: {
            text: "Erik reaches the top quickly but is exhausted.",
            skill: {
              time: 2,
              injury: 2,
            },
          },
        },
      ],
    },
    {
      id: 5, // if any of it fails
      chapter: "Chapter 5: The Guardian of the Horn",
      scene:
        "At the summit, Erik finds the entrance to a cave guarded by a fearsome dragon, the final challenge before reaching the Horn of Jotunheim.",
      question: "How does Erik confront the dragon?",
      choices: [
        {
          id: "a",
          text: "Engage the dragon in combat.",
          consequence: {
            text: "Erik uses his skills and remaining strength to fight the dragon.",
            check: {
              injury: 2,
              time: 1,
              recklessness: 3,
            },
          },
        },
        {
          id: "b",
          text: "Get help from your allies to distract the dragon.",
          consequence: {
            text: "Erik uses his allies to distract the dragon while taking the horn.",
            check: {
              time: 0,
              understanding: 3,
              recklessness: 1,
              injury: 4,
              ally: "troll",
            },
          },
        },
        {
          id: "c",
          text: "Use a magical charm given by the elder.",
          consequence: {
            text: "Erik uses his magical charm to get the dragon under your control.",
            check: {
              hasItem: true,
            },
          },
        },
        {
          id: "d",
          text: "Speak to the dragon and try to reason with it.",
          consequence: {
            text: "Erik uses his allies and the knowledge gathered on the trip to reason with the dragon.",
            check: {
              understanding: 5,
              recklessness: 2,
              ally: "woodland spirit",
            },
          },
        },
      ],
    },
  ];

  const getById = (id) => {
    return chapters.find((chapter) => chapter.id === id);
  };

  return {
    getById,
  };
})();
//CALCULATE ENDING LATER
export default EriksAdventureTxtModule;
