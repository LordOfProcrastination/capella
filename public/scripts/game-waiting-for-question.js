import EriksAdventureTxtModule from "./modules/StoryModule.js";

let chapterIndex = parseInt(localStorage.getItem("chapterIndex"), 10) || 1;

const chapters = EriksAdventureTxtModule.getById(chapterIndex);

const sceneOutput = document.querySelector("#scene-output");
const storyTime = () => {
  sceneOutput.innerHTML = `
        <h4 id="chapter-title" data-value="${chapters.chapter}">${chapters.chapter}</h4>
        <span>${chapters.scene}</span>
    `;
};
storyTime();
document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  console.log("in waiting for question");

  socket.emit("joinSession", "session123"); // Ensure the user joins the session

  socket.on("adminAction", (action) => {
    if (action === "questionStart") {
      console.log("Received questionStart"); // Log
      window.location.href = "game-choose-your-adventure.html";
    }
  });
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.addEventListener("DOMContentLoaded", () => {
  const applyEffect = (element, iterationIncrement) => {
    let iteration = 0;
    let interval = setInterval(() => {
      element.innerText = element.dataset.value
        .split("")
        .map((letter, index) => {
          if (index < Math.floor(iteration)) {
            return element.dataset.value[index];
          }

          if (element.dataset.value[index] === " ") {
            return " ";
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= element.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += iterationIncrement / 3;
    }, 30);
  };

  const chapterTitle = document.querySelector("h4");
  if (chapterTitle) applyEffect(chapterTitle, 2);
});
