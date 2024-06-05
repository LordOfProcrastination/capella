const socket = io();

socket.emit("joinSession", "session123");

socket.on("adminAction", (action) => {
  if (action === "showPin") {
    console.log("Show PIN CODE BIG SCREEN");
    document.getElementById("display-question").innerText =
      "Show PIN CODE BIG SCREEN";
  } else if (action === "startGame") {
    console.log("START GAME");
    document.getElementById("display-question").innerText = "START GAME";
  }
});
