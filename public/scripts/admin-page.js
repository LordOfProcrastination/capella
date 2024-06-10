const socket = io();

let formattedPin = "111 111";

//.............SIDE BAR FUNCTIONS ...................

//............. EVENT LISTENER (BUTTONS)  ...................

document.addEventListener("DOMContentLoaded", (event) => {
  document

    .getElementById("generate-pin-btn")

    .addEventListener("click", confirmPinGeneration);

  document

    .getElementById("play-scene-btn")

    .addEventListener("click", playScene);

  document

    .getElementById("pause-scene-btn")

    .addEventListener("click", pauseScene);

  document.getElementById("ask-btn").addEventListener("click", questionStart);

  //vote result
  const votedResultElement = document.getElementById("voted-result");
  const updateVotedResult = () => {
    const selectedChoice = JSON.parse(localStorage.getItem("selectedChoice"));
    if (selectedChoice) {
      votedResultElement.textContent = selectedChoice.text;
    } else {
      votedResultElement.textContent = "x: Ingen valgte";
    }
  };
  updateVotedResult();
  setInterval(updateVotedResult, 1000);
});

//.............PIN FUNCTIONS ...................

function confirmPinGeneration() {
  const userConfirmed = confirm("Are you sure you want to generate a new PIN?");

  if (userConfirmed) {
    generatePin();
  }
}

function generatePin() {
  let pin = Math.floor(100000 + Math.random() * 900000);

  let pinString = pin.toString();

  formattedPin = pinString.slice(0, 3) + " " + pinString.slice(3);

  document.querySelector("#pin-code").innerText = formattedPin;

  socket.emit("generatePin", formattedPin);
}

// Function to handle button click and emit adminAction event

const showPin = () => {
  socket.emit("generatePin", formattedPin);
};

//.............FUNCTIONS ...................

function updateEventMessage(message) {
  document.getElementById("event-message").textContent = message;
}

function playScene() {
  socket.emit("adminAction", {
    sessionId: "session123",

    action: "playScene",
  });
}

function pauseScene() {
  console.log("Pause scene button clicked");

  socket.emit("adminAction", {
    sessionId: "session123",

    action: "pauseScene",
  });
}

//questionAction;

async function questionStart() {
  console.log("questionStart button clicked");
  socket.emit("adminAction", {
    sessionId: "session123",
    action: "questionStart",
  });

  let chapterId = parseInt(localStorage.getItem("chapterIndex")) || 1;
  const chapterData = await fetchChapterData(chapterId);
  displayLastQuestion(chapterData);

  let nextChapterId = chapterId + 1;
  const nextChapterData = await fetchChapterData(nextChapterId);
  displayNextQuestion(nextChapterData);

  if (chapterData) {
    const { chapter, choices } = chapterData;
    socket.emit("adminAction", {
      sessionId: "session123",
      action: "showQuestion",
      data: { chapter, choices },
    });
  }
}

function displayLastQuestion(data) {
  if (data) {
    const { chapterId, chapter, choices } = data;

    let choicesHtml = choices
      .map((choice) => `<p>${choice.id}: ${choice.text}</p>`)
      .join("");
    const formattedText = `<h3>${chapter}</h3>${choicesHtml}`;
    document.getElementById("last-question-txtbox").innerHTML = formattedText;
    document.getElementById("question-counter").innerHTML =
      `<span>${chapterId} / 5</span>`;
  } else {
    document.getElementById("last-question-txtbox").innerHTML =
      "No data available.";
  }
}

function displayNextQuestion(data) {
  if (data) {
    const { chapter, choices } = data;
    if (chapter && choices) {
      let choicesHtml = choices
        .map((choice) => `<p>${choice.id}: ${choice.text}</p>`)
        .join("");
      const formattedText = `<h4>Next: ${chapter}</h4>${choicesHtml}`;
      document.getElementById("event-message").innerHTML = formattedText;
    } else {
      document.getElementById("event-message").innerHTML =
        "Data structure is incorrect.";
    }
  } else {
    document.getElementById("event-message").innerHTML = "Ending - ";
  }
}

//=============================================================================================================

//------------------------------API FUNCTIONS -------------------------------

fetch("http://localhost:3000/api/storyAPI")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  })

  .then((data) => {
    console.log(data);
  })

  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

//--------------------------fecth Chapter --------------------------------

async function fetchChapterData(chapterId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/storyAPI/${chapterId}`
    );
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.chapter || !data.choices) {
      throw new Error("Data structure is incorrect");
    }
    return { ...data, chapterId };
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null; // Return null in case of error to handle it gracefully
  }
}

//--------------------------SOCKET --------------------------------

// Emit a joinSession event upon connection

socket.emit("joinSession", "session123");

document.addEventListener("DOMContentLoaded", (event) => {
  document

    .querySelector("#show-on-big-screen-btn")

    .addEventListener("click", showPin); //Start game

  document.getElementById("start-btn").onclick = () => {
    localStorage.clear();
    socket.emit("adminAction", {
      sessionId: "session123",

      action: "startGame",
    });

    updateEventMessage("Spillet har startet");
  }; //End game

  document.getElementById("end-btn").onclick = () => {
    socket.emit("adminAction", {
      sessionId: "session123",

      action: "endGame",
    });

    updateEventMessage("Spillet har sluttet");
  };
});

// Listen for adminAction events from the server

socket.on("adminAction", (action) => {
  if (action === "showPin") {
    console.log("Show Pin Code here");
  } else if (action === "startGame") {
    console.log("Game has started");
  } else if (action === "endGame") {
    console.log("Game has ended");
  }
});

//=============================================================================================================
