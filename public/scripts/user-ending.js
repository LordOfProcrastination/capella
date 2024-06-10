const endBtn = document.querySelector("#end-btn");
function redirectToPage(url) {
  window.location.href = url;
}

const endGame = () => {
  redirectToPage("user-rating.html");
  localStorage.clear();
};

endBtn.addEventListener("click", endGame);

const endingOutput = document.getElementById("ending-summary");
const writeEnding = () => {
  endingOutput.innerHTML = `<span>  <b>The Hero's Return</b>
Erik successfully retrieves the Horn of Jotunheim and returns to the village as a hero. 
The village celebrates his bravery, and the horn brings prosperity and protection to the land. 
Erik's name becomes legendary, inspiring future generations. </span>`;
};

if (endingOutput) writeEnding();

// User results
document.addEventListener("DOMContentLoaded", async () => {
  const numberOfChapters = 5;

  for (let i = 1; i <= numberOfChapters; i++) {
    const chapter = await getChapterChoices(i);
    const chosenChoice = getRandomChoice(chapter.choices);
    const distribution = getRandomDistribution(chosenChoice.id);
    updateChoiceResultContainer(chosenChoice, distribution, i);
  }
});

const getChapterChoices = async (chapterId) => {
  const storyAPI = "http://localhost:3000/api/storyapi"; // Change to your actual API endpoint
  try {
    const response = await fetch(`${storyAPI}/${chapterId}`);
    if (!response.ok) {
      throw new Error(`Error fetching chapter: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getRandomChoice = (choices) => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const getRandomDistribution = (selectedChoiceId) => {
  const randomPercentages = generateRandomPercentages();
  const distribution = {
    a: randomPercentages[0],
    b: randomPercentages[1],
    c: randomPercentages[2],
    d: randomPercentages[3],
  };

  return distribution;
};

const generateRandomPercentages = () => {
  let percentages = Array(4)
    .fill(0)
    .map(() => Math.random());
  const sum = percentages.reduce((a, b) => a + b);
  return percentages.map((p) => Math.round((p / sum) * 100));
};

const updateChoiceResultContainer = (
  selectedChoice,
  distribution,
  chapterNumber
) => {
  const container = document.createElement("div");
  container.className = "user-choice-container";
  container.id = `user-choice-container-${chapterNumber}`;

  const choiceTextContainer = document.createElement("div");
  choiceTextContainer.className = "user-choice-txtbox";
  choiceTextContainer.id = `user-choice-txtbox-${chapterNumber}`;
  choiceTextContainer.innerHTML = `<p class="uc-txt" id="uc-txt${chapterNumber}">Du er blant <b>${distribution[selectedChoice.id]}% </b>som valgte "${selectedChoice.text}"</p>`;

  const choiceBarContainer = document.createElement("div");
  choiceBarContainer.className = "user-choice-bar";
  choiceBarContainer.id = `user-choice-bar-${chapterNumber}`;

  const choices = ["a", "b", "c", "d"];

  choices.forEach((choiceId) => {
    const bar = document.createElement("div");
    bar.className = "choice-bar";
    bar.style.width = `${distribution[choiceId]}%`;
    bar.style.backgroundColor =
      choiceId === selectedChoice.id ? "#097153" : "#a2a2a27e";
    bar.innerText = choiceId.toUpperCase();
    choiceBarContainer.appendChild(bar);
  });

  container.appendChild(choiceTextContainer);
  container.appendChild(choiceBarContainer);

  document.querySelector(".choice-result-container").appendChild(container);
};
