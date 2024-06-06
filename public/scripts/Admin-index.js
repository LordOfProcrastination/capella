document.getElementById("join-btn").addEventListener("click", function (event) {
  event.preventDefault();
  fetch("http://localhost:3000/api/gameStatus")
    .then((response) => response.json())
    .then((data) => {
      if (data.gameStarted) {
        window.location.href = "http://localhost:3000/index-page-pin.html";
      } else {
        alert("No game is active");
      }
    })
    .catch((error) => {
      console.error("Error fetching game status:", error);
      alert("Failed to check game status");
    });
});
