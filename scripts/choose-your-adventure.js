/*
    Event Message
*/

import EriksAdventureTxtModule from "./modules/StoryModule.js";

const eventMessage = document.querySelector("#event-message");
let chapterIndex = parseInt(localStorage.getItem("chapterIndex"), 10) || 1;
const timerDuration = 30000;

const getChapter = (index) => {
  let htmlTxt = "";

  const chapter = EriksAdventureTxtModule.getById(index);

  if (chapter) {
    htmlTxt = `
    <img class ="erik" src="images/characters/erik.png" />
    <h4>Chapter ${chapter.id}:</h4>
    <p>${chapter.question}</p>
    `;
  } else {
    htmlTxt = "Chapter not found.";
  }
  console.log("Chapter: " + chapterIndex);
  eventMessage.innerHTML = htmlTxt;
};

const nextChapter = () => {
  getChapter(chapterIndex);
  startTimer();
};
const startTimer = () => {
  setTimeout(() => {
    if (chapterIndex < 5) {
      chapterIndex++;
      localStorage.setItem("chapterIndex", chapterIndex);
      nextChapter();
    } else {
      localStorage.clear();
      chapterIndex = 1;
      console.log("Reached the last chapter. LocalStorage cleared.");
      eventMessage.innerHTML = "You've reached the end of the adventure.";
    }
  }, timerDuration);
};
nextChapter(chapterIndex);
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
  timerBar.innerHTML = `<span>⌛</span>`;
};

getTimerBar();

/*
    Choices
*/

let selectedButton = null;

function createEventButtons(index) {
  const container = document.getElementById("event-option-container");
  container.innerHTML = "";

  const chapters = EriksAdventureTxtModule.getById(index);
  const choicesFromModule = chapters.choices;

  console.log(chapters.choices);
  choicesFromModule.forEach((choice, choiceIndex) => {
    const button = document.createElement("div");
    button.className = `event-btn btn-${choiceIndex}`;
    button.innerText = choice.text;

    // Click event listener for button
    button.addEventListener("click", () => {
      if (selectedButton) {
        // Revert the previous button to its default state
        selectedButton.classList.remove("active");
      }

      // Set the new selected button
      button.classList.add("active");
      selectedButton = button;

      // Update character stats based on the selected choice
      updateCharacterStats(choice.consequence);
    });

    container.appendChild(button);
  });
}

function updateCharacterStats(consequence) {
  if (consequence.skill) {
    for (let skill in consequence.skill) {
      if (characterStats.hasOwnProperty(skill)) {
        characterStats[skill] += consequence.skill[skill];
      }
    }
  }
  localStorage.setItem("characterStats", JSON.stringify(characterStats));

  if (consequence.inventory) {
    characterEquipment.inventory = consequence.inventory;
    characterEquipment.hasItem = true;
  }
  localStorage.setItem(
    "characterEquipment",
    JSON.stringify(characterEquipment)
  );

  if (consequence.ally) {
    characterRelationships.push(consequence.ally);
  }
  localStorage.setItem(
    "characterRelationships",
    JSON.stringify(characterRelationships)
  );

  getCharacterEquipment();
  getCharacterRelationships();
  getCharacterStats();
}
const characterEquipmentContainer = document.querySelector(
  ".character-equipment"
);
const characterStatsContainer = document.querySelector(".character-stats");
const characterRelationshipsContainer = document.querySelector(
  ".character-relationships"
);
let characterStats = JSON.parse(localStorage.getItem("characterStats")) || {
  understanding: 0,
  time: 2,
  supply: 5,
  recklessness: 0,
  injury: 0,
};
let characterEquipment = JSON.parse(
  localStorage.getItem("characterEquipment")
) || {
  inventory: "Magical Charm",
  hasItem: false,
};
let characterRelationships =
  JSON.parse(localStorage.getItem("characterRelationships")) || [];

function getCharacterEquipment() {
  characterEquipmentContainer.innerHTML = `
    <h4>Equipment</h4>
    ${characterEquipment.hasItem ? `<p>${characterEquipment.inventory}</p>` : "<p>No items</p>"}
  `;
}

function getCharacterStats() {
  characterStatsContainer.innerHTML = `
    <h4>Stats</h4>
    <p>Kunnskap: ${characterStats.understanding}</p>
    <p>Tid: ${characterStats.time}</p>
    <p>Mat: ${characterStats.supply}</p>
    <p>Hovmod: ${characterStats.recklessness}</p>
    <p>Skader: ${characterStats.injury}</p>
  `;
}

function getCharacterRelationships() {
  characterRelationshipsContainer.innerHTML = `
    <h4>Relationships</h4>
    <ul>
      ${characterRelationships.map((ally) => `<li>${ally}</li>`).join("")}
    </ul>
  `;
}

// Initial call to set up event buttons
createEventButtons(chapterIndex);

// Initial call to display character sheet
getCharacterEquipment();
getCharacterRelationships();
getCharacterStats();
