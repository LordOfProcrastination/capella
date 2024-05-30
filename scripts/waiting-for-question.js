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

function redirectToPage(url, delay) {
  setTimeout(function () {
    window.location.href = url;
  }, delay);
}

// Example usage: Redirect to "target.html" after 5 seconds (5000 milliseconds)
window.onload = function () {
  redirectToPage("choose-your-adventure.html", 10000);
};
