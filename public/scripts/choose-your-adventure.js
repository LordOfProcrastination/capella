const eventMessage = document.querySelector("#event-message");
let chapterIndex = 1;
const timerDuration = 5000;
let selectedChoice = null;
let timer = null;
const storyAPI = "http://localhost:3000/api/storyapi";
const characterSkills = "http://localhost:3000/api/characterstatus/skills";
const characterAllies = "http://localhost:3000/api/characterstatus/allies";
const characterItems = "http://localhost:3000/api/characterstatus/items";

const getChapter = async (index) => {
  let htmlTxt = "";

  try {
    const response = await fetch(`${storyAPI}/${index}`);
    if (!response.ok) {
      throw new Error(`Error fetching chapter: ${response.statusText}`);
    }
    const chapter = await response.json();

    if (chapter) {
      htmlTxt = `
      <img class ="erik" src="/images/characters/erik.png" />
      <h4>Chapter ${chapter.id}:</h4>
      <p>${chapter.question}</p>
      `;
    } else {
      htmlTxt = "Chapter not found.";
    }
  } catch (error) {
    console.error(error);
    htmlTxt = "Error fetching chapter data.";
  }

  console.log("Chapter: " + chapterIndex);
  eventMessage.innerHTML = htmlTxt;
};

const nextChapter = () => {
  getChapter(chapterIndex);
  createEventButtons(chapterIndex);
  startTimer();
};

const startTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    if (selectedChoice) {
      updateCharacterStats(selectedChoice.consequence);
    }

    if (chapterIndex < 5) {
      chapterIndex++;
      nextChapter();
    } else {
      eventMessage.innerHTML = "You've reached the end of the adventure.";
    }
  }, timerDuration);
};

/*
    Timer Bar
*/
const timerBar = document.querySelector("#timer-bar");
let timeLimit = "30s";

if (timerBar) {
  timerBar.style.animationDuration = timeLimit;
} else {
  console.error("Timer bar element not found");
}
const getTimerBar = () => {
  timerBar.innerHTML = `
  <span>⌛</span>`;
};

getTimerBar();

/*
    Choices
*/

let selectedButton = null;

const createEventButtons = async (index) => {
  const container = document.getElementById("event-option-container");
  container.innerHTML = "";

  try {
    const response = await fetch(`${storyAPI}/${index}`);
    if (!response.ok) {
      throw new Error(`Error fetching chapter: ${response.statusText}`);
    }
    const chapter = await response.json();
    const choices = chapter.choices;

    console.log(chapter.choices);
    choices.forEach((choice, choiceIndex) => {
      const button = document.createElement("div");
      button.className = `event-btn btn-${choiceIndex}`;
      button.innerText = choice.text;

      // Click event listener for button
      button.addEventListener("click", () => {
        if (selectedButton) {
          // Revert the previous button to its default state
          selectedButton.classList.remove("active");
          alert("Waiting for other players");
        }

        // Set the new selected button
        button.classList.add("active");
        selectedButton = button;

        // Set the selected choice but do not update character stats yet
        selectedChoice = choice;
      });

      container.appendChild(button);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = "Error fetching choices.";
  }
};

let isUpdating = false;

function updateCharacterStats(consequence) {
  if (!consequence || isUpdating) return;

  isUpdating = true;

  console.log("Consequence:", consequence);

  // Fetch current stats first
  fetch(characterSkills)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch character stats");
      }
      return response.json();
    })
    .then((data) => {
      const currentStats = data[0] || {};
      const characterStats = {
        understanding: currentStats.understanding || 0,
        time: currentStats.time || 0,
        supplies: currentStats.supplies || 0,
        recklessness: currentStats.recklessness || 0,
        injuries: currentStats.injuries || 0,
      };

      console.log("Current Stats Before Update:", characterStats);

      if (consequence.skill) {
        characterStats.understanding += consequence.skill.understanding || 0;
        characterStats.time += consequence.skill.time || 0;
        characterStats.supplies += consequence.skill.supplies || 0;
        characterStats.recklessness += consequence.skill.recklessness || 0;
        characterStats.injuries += consequence.skill.injuries || 0;
      }

      console.log("Updated Stats:", characterStats);

      // Updating character stats
      return fetch(characterSkills, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characterStats),
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update character stats");
      }
      return getCharacterStats();
    })
    .then(() => {
      if (consequence.item) {
        const item = {
          item: consequence.item,
          isActive: true,
        };

        return fetch(characterItems, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
      }
    })
    .then((response) => {
      if (response && !response.ok) {
        throw new Error("Failed to update character equipment");
      }
      return getCharacterEquipment();
    })
    .then(() => {
      if (consequence.ally) {
        const ally = {
          ally: consequence.ally,
          id: 1, // Ensure id is correctly set if needed
        };

        return fetch(characterAllies, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ally),
        });
      }
    })
    .then((response) => {
      if (response && !response.ok) {
        throw new Error("Failed to update character allies");
      }
      return getCharacterRelationships();
    })
    .catch((error) => {
      console.error("Error updating character:", error);
    })
    .finally(() => {
      isUpdating = false;
    });

  // Reset selectedChoice to prevent multiple updates
  selectedChoice = null;

  if (consequence.text && typeof consequence.text === "string") {
    localStorage.setItem("consequenceTxt", consequence.text);
  }
}

const characterEquipmentContainer = document.querySelector(
  ".character-equipment"
);
const characterStatsContainer = document.querySelector(".character-stats");
const characterRelationshipsContainer = document.querySelector(
  ".character-relationships"
);

function getCharacterEquipment() {
  fetch(characterItems)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch character equipment");
      }
      return response.json();
    })
    .then((characterEquipment) => {
      characterEquipmentContainer.innerHTML = `
        <h4>Equipment</h4>
        ${
          characterEquipment.length
            ? `<p>${characterEquipment.map((item) => item.item).join(", ")}</p>`
            : "<p>No items</p>"
        }
      `;
    })
    .catch((error) => {
      console.error("Error fetching character equipment:", error);
    });
}

function getCharacterStats() {
  fetch(characterSkills)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch character stats");
      }
      return response.json();
    })
    .then((data) => {
      const characterStats = data[0];

      console.log("Fetched Character Stats:", characterStats);

      characterStatsContainer.innerHTML = `
        <h4>Stats</h4>
        <p>Understanding: ${characterStats.understanding}</p>
        <p>Time: ${characterStats.time}</p>
        <p>Supplies: ${characterStats.supplies}</p>
        <p>Recklessness: ${characterStats.recklessness}</p>
        <p>Injuries: ${characterStats.injuries}</p>
      `;
    })
    .catch((error) => {
      console.error("Error fetching character stats:", error);
    });
}

function getCharacterRelationships() {
  fetch(characterAllies)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch character relationships");
      }
      return response.json();
    })
    .then((characterRelationships) => {
      characterRelationshipsContainer.innerHTML = `
        <h4>Relationships</h4>
        <ul>
          ${characterRelationships.map((ally) => `<li>${ally.ally}</li>`).join("")}
        </ul>
      `;
    })
    .catch((error) => {
      console.error("Error fetching character relationships:", error);
    });
}

// Initial call to set up event buttons and display character sheet
nextChapter();
getCharacterEquipment();
getCharacterRelationships();
getCharacterStats();

function redirectToPage(url, delay) {
  setTimeout(function () {
    window.location.href = url;
  }, delay);
}
