//WORK IN PROGRESS.

const EriksAdventureTxtModule = (() => {
  const chapters = [
    {
      id: 1,
      chapter: "Chapter 1: The Mysterious Map",
      scene:
        "As Erik prepared for his journey, the village elder handed him a mysterious map. The map was said to guide him to the Horn of Jotunheim, hidden deep within the treacherous mountains.",
      question: "What does Erik do first?", // 0 understanding, 2 time, 5 supply, 0 recklessness
      choices: [
        {
          id: "a",
          text: "Study the map carefully before setting off.",
          consequence: {
            text: "Erik gains a deeper understanding of the terrain, helping him navigate better later.", // +1 understanding
            skill: {
              understanding: 1,
            },
          },
        },
        {
          id: "b",
          text: "Gather supplies and provisions from the village.",
          consequence: {
            text: "Erik has more resources for the journey but spends more time preparing.", // +1 supply -1 time
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
            text: "Erik receives a magical charm that may aid him.", //+MAGICAL CHARM
            inventory: "Magical Charm",
          },
        },
        {
          id: "d",
          text: "Leave immediately, relying on his instincts.",
          consequence: {
            text: "Erik starts quickly but lacks preparation.", // + 1 time  +1 recklessness
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
            text: "Erik stays on course but encounters traps.", // -1 time, +1 injury
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
            text: "Erik avoids traps but may be led into danger.", // +2 understanding
            skill: {
              understanding: 2,
            },
          },
        },
        {
          id: "c",
          text: "Use his intuition to find the way.",
          consequence: {
            text: "Erik's path is unpredictable, leading to both opportunities and risks.", // +1 recklessness, +1 supply
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
            text: "Erik gains an ally in the creature but must share his provisions.", // -1 supply, +ALLY (WOODLAND CREATURE)
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
            text: "Erik secures safe passage but reduces his supplies.", // -1 supply, +1 understanding
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
            text: "Erik defeats the trolls, gaining their respect but sustaining injuries.", // +1 injury, +3 understanding
            skill: {
              injury: 1,
              understanding: 3,
            },
          },
        },
        {
          id: "c",
          text: "Attempt to trick them with a riddle.",
          consequence: {
            text: "Erik outsmarts the trolls, gaining safe passage and their help.", // understanding check, +TROLL HELP, +2 understanding
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
            text: "Erik finds a longer but safer route, delaying his journey.", // -1 time, +1 understanding
            skill: {
              time: -1,
              understanding: 1,
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
            text: "Erik conserves energy but takes longer to reach the top.", // -1 time, +1 understanding
            skill: {
              time: -1,
              understanding: 1,
            },
          },
        },
        {
          id: "b",
          text: "Look for hidden paths and shortcuts.",
          consequence: {
            text: "Erik reaches the summit faster but faces greater risks.", // +1 time, +1 recklessness
            skill: {
              time: 1,
              recklessness: 1,
            },
          },
        },
        {
          id: "c",
          text: "Call upon the spirits of the mountain for assistance.",
          consequence: {
            text: "Erik receives guidance but at a cost (e.g., a favor or offering).", // understanding check, woodland; Must
            skill: {
              understanding: 2, // Assuming understanding check gives an advantage if successful
            },
            cost: "favor",
          },
        },
        {
          id: "d",
          text: "Rely on his strength and endurance to scale the mountain.",
          consequence: {
            text: "Erik reaches the top quickly but is exhausted.", // +2 time, +2 injury (if troll or woodland spirit is with him, then +1 injury)
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
            text: "Erik uses his skills and remaining strength.", // check injury, check time, if he is late, then the dragon will be more prepared. The scene will address that the dragon have seen him coming to him. (if late, then recklessness/2 will be added to damage taken (injury+recklessness/2))
          },
        },
        {
          id: "b",
          text: "Get help from the troll to distract the dragon.",
          consequence: {
            text: "The outcome depends on the time and assistance Erik has.", // check troll, time. If Eric were late then added to damage taken (if time < 0 && recklessness+injury > certain point, Ending 3. Not success)
          },
        },
        {
          id: "c",
          text: "Use a magical charm given by the elder.",
          consequence: {
            text: "If Erik received the charm, it may sway the dragon, otherwise, it fails.", // check magical charm. If success, always ENDING #1
          },
        },
        {
          id: "d",
          text: "Speak to the dragon and try to reason with it.",
          consequence: {
            text: "If Erik has wood spirit with him, it will be able to convince the dragon, otherwise, Erik must rely on his knowledge about the journey.", // check spirit, if none, then understanding .
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
