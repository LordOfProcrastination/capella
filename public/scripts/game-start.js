document.addEventListener("DOMContentLoaded", () => {
  const snowContainer = document.getElementById("snow-container");
  const snowflakeCount = 200; // Number of snowflakes

  for (let i = 0; i < snowflakeCount; i++) {
    let snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Random size between 2px and 6px
    let size = Math.random() * 3 + 1 + "px";
    snowflake.style.width = size;
    snowflake.style.height = size;

    // Random horizontal position
    snowflake.style.left = Math.random() * 360 + "px";
    snowflake.style.borderRadius = 50 + "%";

    // Random animation duration between 3s and 10s
    snowflake.style.animationDuration = Math.random() * 7 + 3 + "s";

    // Random delay before the animation starts
    snowflake.style.animationDelay = Math.random() * 5 + "s";

    snowContainer.appendChild(snowflake);
  }
  document.getElementById("pin").addEventListener("input", function (event) {
    let input = event.target.value.replace(/\s+/g, ""); // Remove any spaces
    if (input.length > 3) {
      input = input.slice(0, 3) + " " + input.slice(3);
    }
    event.target.value = input;
  });
});

document
  .getElementById("pin-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let enteredPin = document.getElementById("pin").value.replace(/\s+/g, "");
    const messageElement = document.getElementById("message");

    fetch("http://localhost:3000/api/validatePin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enteredPin }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.valid) {
          messageElement.textContent = "Riktig PIN.";
          messageElement.style.color = "green";

          // Redirect to another page after a short delay
          setTimeout(() => {
            window.location.href = "http://localhost:3000/game-start-name.html";
          }, 1000); // 1 second delay for the user to see the success message
        } else {
          messageElement.textContent = "Feil PIN. Vennligst prøv igjenn.";
          messageElement.style.color = "red";
        }
      })
      .catch((error) => {
        console.error("Error validating PIN:", error);
        messageElement.textContent = "Error validating PIN. Please try again.";
        messageElement.style.color = "red";
      });

    // Clear the input field
    document.getElementById("pin").value = "";
  });
