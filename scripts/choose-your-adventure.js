// Eventcontainer

const eventMessage = document.querySelector("#event-message");

const getTitle = () => {
  eventMessage.innerHTML = `<h2>Hvordan skal Askeladden reagere?</h2>`;
};
getTitle();

// Timerbar

const timerBar = document.querySelector("#timer-bar");

const getTimerBar = () => {
  timerBar.innerHTML = `<p> Timer Bar</p>`;
};
getTimerBar();

// Choose Your Option

const eventBtns = document.querySelectorAll(".event-btn");

const getEventBtns = (event) => {
  eventBtns.forEach((btn, index) => {
    btn.textContent = `button ${index + 1}`;
  });
};
getEventBtns();

// Character Sheet

const characterEquipment = document.querySelector("#character-equipment");
const characterStats = document.querySelector("#character-stats");
const characterRelationships = document.querySelector(
  "#character-relationships"
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
