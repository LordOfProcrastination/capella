const socket = io();
let formattedPin = "111 111";
//.............SIDE BAR FUNCTIONS ...................

//............. EVENT LISTENER (BUTTONS)  ...................
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
const showPincode = () => {
  socket.emit("generatePin", formattedPin);
};
//.............FUNCTIONS ...................
function updateEventMessage(message) {
  document.getElementById("event-message").textContent = message;
}

function playScene() {
  updateEventMessage("Scene starter om 5 sekunder...");
  setTimeout(() => {
    window.location.href = "watching-the-scene";
  }, 5000);
}

function pauseScene() {
  window.location.href = "watching-the-scene-innaktiv.html";
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
//--------------------------SOCKET --------------------------------

// Emit a joinSession event upon connection
socket.emit("joinSession", "session123");

document.addEventListener("DOMContentLoaded", (event) => {
  document
    .querySelector("#show-on-big-screen-btn")
    .addEventListener("click", showPincode);

  //Start game
  document.getElementById("start-btn").onclick = () => {
    socket.emit("adminAction", {
      sessionId: "session123",
      action: "startGame",
    });
    updateEventMessage("Spillet har startet");
  };
  //End game
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
    updateEventMessage("The game has started!");
    gameStarted = true;
  } else if (action === "endGame") {
    console.log("Game has ended");
    updateEventMessage("The game has ended.");
    gameStarted = false;
  }
});

//=============================================================================================================
