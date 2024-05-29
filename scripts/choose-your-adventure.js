/*
    Event Message
*/

import EriksAdventureTxtModule from "./modules/StoryModule.js";

const eventMessage = document.querySelector("#event-message");
let chapterIndex = parseInt(localStorage.getItem("chapterIndex"), 10) || 1;
const timerDuration = 30000;

const getChapter = (index) => {
  let htmlTxt = "";

  // Retrieve the chapter details by ID
  const chapter = EriksAdventureTxtModule.getById(index);

  // Check if the chapter exists
  if (chapter) {
    // Assuming chapter has a property 'content' that contains the text or HTML
    htmlTxt = `
    <img class ="erik" src="images/characters/erik.png" />
    <h4>Chapter ${chapter.id}:</h4>
    <p>${chapter.question}</p>
    `;
  } else {
    htmlTxt = "Chapter not found.";
  }
  console.log("Chapter: " + chapterIndex);
  // Set the HTML content of the eventMessage element
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
      localStorage.setItem("chapterIndex", chapterIndex); // Save the index to localStorage
      nextChapter();
    } else {
      localStorage.removeItem("chapterIndex");
      // Optionally, you can reset chapterIndex to 1 if you want to restart the cycle
      chapterIndex = 1;
      console.log("Reached the last chapter. LocalStorage cleared.");
      // Display a final message or take any other action here if needed
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
  timerBar.style.animationDuration = timeLimit; // Set the animation duration
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
const choices = [
  {
    text: "Option 1 hanlde a long long text",
    svg: "/images/buttons/geometry/circle-default.svg",
    selectedSvg: "/images/buttons/geometry/circle-selected.svg",
  },
  {
    text: "Option 2",
    svg: "/images/buttons/geometry/square-default.svg",
    selectedSvg: "/images/buttons/geometry/square-selected.svg",
  },
  {
    text: "Option 3",
    svg: "/images/buttons/geometry/triangle-default.svg",
    selectedSvg: "/images/buttons/geometry/triangle-selected.svg",
  },

  {
    text: "Option 4",
    svg: "/images/buttons/geometry/pentagon-default.svg",
    selectedSvg: "/images/buttons/geometry/pentagon-selected.svg",
  },
];

let selectedButton = null;

function createEventButtons(choices, index) {
  const container = document.getElementById("event-option-container");
  container.innerHTML = "";

  const chapter = EriksAdventureTxtModule.getById(index);

  console.log(chapter.choices);
  choices.forEach((choice) => {
    const button = document.createElement("div");
    button.className = "event-btn";
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <image href="${choice.svg}" width="100%" height="100%"/>
      </svg>
      <p class="event-btn-text">${chapter.choices.a.text}</p>
    `;
    //Click a button, another buttons will pop up if an another button is pressed
    button.addEventListener("click", () => {
      if (selectedButton) {
        // Revert the previous button to its default state
        selectedButton
          .querySelector("image")
          .setAttribute("href", selectedButton.dataset.defaultSvg);
      }
      // Set the new selected button
      button.querySelector("image").setAttribute("href", choice.selectedSvg);
      selectedButton = button;
    });

    // Store default SVG in a data attribute
    button.dataset.defaultSvg = choice.svg;

    container.appendChild(button);
  });
}
createEventButtons(choices, chapterIndex);
/* 
    Character Sheet
*/

const characterEquipmentContainer = document.querySelector(
  ".character-equipment"
);
const characterStatsContainer = document.querySelector(".character-stats");
const characterRelationshipsContainer = document.querySelector(
  ".character-relationships"
);

const characterStats = {
  understanding: 0,
  time: 2,
  supply: 5,
  recklessness: 0,
  injury: 0,
};
const characterEquipment = {
  image: "octoknife.jpg",
  hasItem: false,
};
const characterRelationships = [];

const getCharacterEquipment = () => {
  characterEquipmentContainer.innerHTML = `
  <h4>Equipment</h4>
  `;
};
const getCharacterStats = () => {
  characterStatsContainer.innerHTML = `
  <h4>Stats</h4>
  <p>Kunnskap: ${characterStats.understanding}</p>
  <p>Tid: ${characterStats.time}</p>
  <p>Mat: ${characterStats.supply}</p>
  <p>Skader: ${characterStats.injury}</p>
  `;
};
const getCharacterRelationships = () => {
  characterRelationshipsContainer.innerHTML = `
  <h4>Relationships</h4>
  <p>??</p>
  <p>??</p>
  `;
};

getCharacterEquipment();
getCharacterRelationships();
getCharacterStats();
