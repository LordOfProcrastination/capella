//WORK IN PROGRESS.

const eriksAdventure = [
  {
    chapter: "Chapter 1: The Mysterious Map",
    scene:
      "As Erik prepared for his journey, the village elder handed him a mysterious map. The map was said to guide him to the Horn of Jotunheim, hidden deep within the treacherous mountains.",
    question: "What does Erik do first?", // 0 undestanding, 2 time, 5 supply, 0 recklessness
    choices: {
      a: {
        text: "Study the map carefully before setting off.",
        consequence:
          "Erik gains a deeper understanding of the terrain, helping him navigate better later.", // +1 understanding
      },
      b: {
        text: "Gather supplies and provisions from the village.",
        consequence:
          "Erik has more resources for the journey but spends more time preparing.", // +1 supply -1 time
      },
      c: {
        text: "Seek advice from the elder about the journey ahead.",
        consequence: "Erik receives a magical charm that may aid him.", //+MAGICAL CHARM
      },
      d: {
        text: "Leave immediately, relying on his instincts.",
        consequence: "Erik starts quickly but lacks preparation.", // + 1 time  +1 recklessness
      },
    },
  },
  {
    chapter: "Chapter 2: The Enchanted Forest",
    scene:
      "Following the path marked on the map, Erik enters the heart of an enchanted forest, where the trees whisper secrets and shadows dance mysteriously.",
    question: "How does Erik navigate the forest?",
    choices: {
      a: {
        text: "Follow the path marked on the map.",
        consequence: "Erik stays on course but encounters traps.", //-1 time, + 1 injury
      },
      b: {
        text: "Listen to the whispers of the trees for guidance.",
        consequence: "Erik avoids traps but may be led into danger.", //+2 undestanding
      },
      c: {
        text: "Use his intuition to find the way.",
        consequence:
          "Erik's path is unpredictable, leading to both opportunities and risks.", // +1 recklessness, +1 supply
      },
      d: {
        text: "Seek help from a woodland creature he encounters.",
        consequence:
          "Erik gains an ally in the creature but must share his provisions.", //-1 supply, + ALLY (WOODLAND CREATURE)
      },
    },
  },
  {
    chapter: "Chapter 3: The Bridge of Trolls",
    scene:
      "After days of travel through the forest, Erik arrives at a rickety old bridge guarded by two menacing trolls. The trolls demand a toll for safe passage.",
    question: "How does Erik deal with the trolls?",
    choices: {
      a: {
        text: "Offer them a portion of his provisions.",
        consequence: "Erik secures safe passage but reduces his supplies.", // -1 supply, + 1 undestanding
      },
      b: {
        text: "Challenge them to a battle.",
        consequence:
          "Erik defeats the trolls, gaining their respect but sustaining injuries.", //+ 1 injury, +3 understanding
      },
      c: {
        text: "Attempt to trick them with a riddle.",
        consequence:
          "Erik outsmarts the trolls, gaining safe passage and their help.", //understanding check, + TROLL HELP, +2 understanding
      },
      d: {
        text: "Find another way around the bridge.",
        consequence:
          "Erik finds a longer but safer route, delaying his journey.", //-1 time, + 1 understanding
      },
    },
  },
  {
    chapter: "Chapter 4: The Mountain Pass",
    scene:
      "Having crossed the bridge, Erik faces the steep and perilous climb up the Mountain of Giants, where the Horn of Jotunheim is said to be hidden.",
    question: "How does Erik approach the climb?",
    choices: {
      a: {
        text: "Climb carefully and methodically.",
        consequence: "Erik conserves energy but takes longer to reach the top.", //-1 time +1 understanding
      },
      b: {
        text: "Look for hidden paths and shortcuts.",
        consequence: "Erik reaches the summit faster but faces greater risks.", //+1 time +1 recklessness
      },
      c: {
        text: "Call upon the spirits of the mountain for assistance.",
        consequence:
          "Erik receives guidance but at a cost (e.g., a favor or offering).", //check understanding, woodland; Must
      },
      d: {
        text: "Rely on his strength and endurance to scale the mountain.",
        consequence: "Erik reaches the top quickly but is exhausted.", // +2 time +2 injury (if troll or woodland spirit is with him, then +1 injury)
      },
    },
  },
  {
    chapterNumber: 5, // if any of it fails
    chapter: "Chapter 5: The Guardian of the Horn",
    scene:
      "At the summit, Erik finds the entrance to a cave guarded by a fearsome dragon, the final challenge before reaching the Horn of Jotunheim.",
    question: "How does Erik confront the dragon?",
    choices: {
      //injury + time + recklessness
      a: {
        text: "Engage the dragon in combat.",
        consequence: "Erik uses his skills and remaining strength", //check injury, check time, if he is late, then the dragon will be more prepared. The scene will address that
        //the dragon have seen him coming to him. (if late, then recklessness/2 will be added to damage taken (injury+recklessness/2))
      },
      b: {
        //troll + time + recklessness
        text: "Get help from the troll to distract the dragon", // check troll, time. If Eric were late then added to damage taken (if time < 0 && recklessness+injury > certain point, Ending 3. Not success)
        consequence: "The outcome depends on which.",
      },
      c: {
        //magical charm (not availiable in choice. Show only if has a charm (secret choice))
        text: "Use a magical charm given by the elder.",
        consequence:
          "If Erik received the charm, it may sway the dragon, otherwise, it fails.", //check magical charm. If success, always ENDING #1
      },
      d: {
        //wood spirit
        text: "Speak to the dragon and try to reason with it.",
        consequence:
          "If Erik has wood spirit with him, it will be able to convice the dragon, otherwise, Eric must rely onto his knowledge about the journey.", //check spirit, if none, then understanding .
      },
    },
  },
];
//CALCULATE ENDING LATER
export default eriksAdventure;
