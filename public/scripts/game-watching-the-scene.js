document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  console.log("in watching the scene inactive");

  socket.emit("joinSession", "session123"); // Ensure the user joins the session

  socket.on("adminAction", (action) => {
    if (action === "pauseScene") {
      console.log("Received pauseScene action"); // Log
      window.location.href = "game-waiting-for-question.html"; // Redirect to the waiting for question page
    } else {
      console.log("In else in inactive");
    }
  });
});
