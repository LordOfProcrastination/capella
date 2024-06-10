import EriksAdventureTxtModule from "./modules/StoryModule.js";

let chapterIndex = parseInt(localStorage.getItem("chapterIndex"), 10) || 1;

const chapters = EriksAdventureTxtModule.getById(chapterIndex);

const sceneOutput = document.querySelector("#scene-output");
const storyTime = () => {
  sceneOutput.innerHTML = `
        <h4>${chapters.chapter}</h4>
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
