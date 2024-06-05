const socket = io();

socket.emit("joinSession", "session123");

socket.on("adminAction", (data) => {
  if (data.action === "showPin") {
    console.log("Show PIN CODE BIG SCREEN", data.pin);
    document.getElementById("main-message").innerText = `PIN KODE: ${data.pin}`;
  } else if (data.action === "startGame") {
    console.log("START GAME");
    document.getElementById("answer-container").innerText = "START GAME";
  }
});
