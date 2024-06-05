//.............SIDE BAR FUNCTIONS ...................

//.............PIN FUNCTIONS ...................

document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("generate-pin-btn")
    .addEventListener("click", generatePin);
});

function generatePin() {
  let pin = Math.floor(100000 + Math.random() * 900000);
  let pinString = pin.toString();
  let formattedPin = pinString.slice(0, 3) + " " + pinString.slice(3);
  document.querySelector("#pin-code").innerText = formattedPin;
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

const socket = io();

// Emit a joinSession event upon connection
socket.emit("joinSession", "session123");

document.addEventListener("DOMContentLoaded", (event) => {
  // Set up the click event listener after the DOM is fully loaded
  document
    .querySelector("#show-on-big-screen-btn")
    .addEventListener("click", functionthing);

  // Set up other event listeners if needed
  document.getElementById("start-btn").onclick = () => {
    socket.emit("adminAction", {
      sessionId: "session123",
      action: "startGame",
    });
  };
});

// Function to handle button click and emit adminAction event
const functionthing = () => {
  socket.emit("adminAction", {
    sessionId: "session123",
    action: "showPin",
  });
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
