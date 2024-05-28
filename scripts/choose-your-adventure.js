const eventMessage = document.querySelector("#event-message");

const getTitle = () => {
  eventMessage.innerHTML = `<h2>Hvordan skal Askeladden reagere?</h2>`;
};
getTitle();

const timerBar = document.querySelector("#timer-bar");
let timeLimit = "30s";

if (timerBar) {
  timerBar.style.animationDuration = timeLimit; // Set the animation duration
} else {
  console.error("Timer bar element not found");
}
const getTimerBar = () => {
  timerBar.innerHTML = `<span>some</span>`;
};

getTimerBar();

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

function createEventButtons(choices) {
  const container = document.getElementById("event-option-container");
  container.innerHTML = "";

  choices.forEach((choice) => {
    const button = document.createElement("div");
    button.className = "event-btn";
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <image href="${choice.svg}" width="100%" height="100%"/>
      </svg>
      <p class="event-btn-text">${choice.text}</p>
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

const characterEquipment = document.querySelector(".character-equipment");
const characterStats = document.querySelector(".character-stats");
const characterRelationships = document.querySelector(
  ".character-relationships"
);

const getCharacterEquipment = () => {
  characterEquipment.innerHTML = `<p>Equipment</p>`;
};
const getCharacterStats = () => {
  characterStats.innerHTML = `<p>Stats</p>`;
};
const getCharacterRelationships = () => {
  characterRelationships.innerHTML = `<p>Relationships</p>`;
};

getCharacterEquipment();
getCharacterRelationships();
getCharacterStats();
createEventButtons(choices);
