const socket = io();

socket.emit("joinSession", "session123");

socket.on("adminAction", (data) => {
  console.log("Received adminAction:", data);

  if (data.action === "showPin") {
    console.log("Show PIN CODE BIG SCREEN", data.pin);
    document.getElementById("main-message").innerText = `PIN KODE: ${data.pin}`;
  } else if (data.action === "startGame") {
    console.log("START GAME");
    document.getElementById("answer-container").innerText = "START GAME";
  } else if (data.action === "showQuestion") {
    console.log("Show Question", data.data);
    const { chapter, choices } = data.data;
    document.getElementById("main-message").innerText = chapter;

    const answerContainer = document.getElementById("answer-container");
    answerContainer.innerHTML = ""; // Clear previous answers

    choices.forEach((choice, index) => {
      const answerDiv = document.createElement("div");
      answerDiv.className = `grid-item color-${index + 1}`; // Assign different colors
      answerDiv.innerText = choice.text;
      answerContainer.appendChild(answerDiv);
    });
  }
});
