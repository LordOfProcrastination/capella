const socket = io();
let formattedPin = "975 345";
//.............SIDE BAR FUNCTIONS ...................

//.............PIN FUNCTIONS ...................
document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("generate-pin-btn")
    .addEventListener("click", confirmPinGeneration);
});

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
}
//.............FUNCTIONS ...................
function updateEventMessage(message) {
  document.getElementById("event-message").textContent = message;
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

// Function to handle button click and emit adminAction event
const showPincode = () => {
  socket.emit("generatePin", formattedPin);
};

// Listen for adminAction events from the server
socket.on("adminAction", (action) => {
  if (action === "showPin") {
    console.log("Show Pin Code here");
  } else if (action === "startGame") {
    console.log("Show start game");
  }
});

//=============================================================================================================
