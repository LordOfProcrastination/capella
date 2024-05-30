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
