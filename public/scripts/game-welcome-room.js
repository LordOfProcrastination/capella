document.addEventListener("DOMContentLoaded", () => {
  const seatingChart = document.querySelector(".seating-chart");

  // Generate seats
  for (let i = 0; i < 100; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seatingChart.appendChild(seat);
  }

  // Simulate users logging in one by one
  function fillSeats() {
    const seats = Array.from(document.querySelectorAll(".seat"));
    let index = 0;

    function selectSeat() {
      if (index < seats.length) {
        seats[index].classList.add("taken");
        index++;
        setTimeout(selectSeat, Math.random() * 1000);
      }
    }

    selectSeat();
  }

  fillSeats();

  // Hent navn fra url-parameter

  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");

  // Display the name
  if (name) {
    document.getElementById("username").textContent = name;
  }

  // Animate bubbles
  const bubblesContainer = document.querySelector(".bubbles");

  function createBubble(container, text) {
    let bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    container.appendChild(bubble);

    animateBubble(bubble, container);
  }

  function animateBubble(bubble, container) {
    const bubbleSpeed = 1;
    const containerRect = container.getBoundingClientRect();
    const bubbleDiameter = 80;

    let x = Math.random() * (containerRect.width - bubbleDiameter);
    let y = Math.random() * (containerRect.height - bubbleDiameter);

    // Determine initial vertical direction and position
    const startsFromBottom = Math.random() > 0.5;
    if (startsFromBottom) {
      y = containerRect.height - bubbleDiameter; // Start from bottom
    } else {
      y = Math.random() * (containerRect.height - bubbleDiameter + 400);
    }

    let directionX = (Math.random() - 0.5) * bubbleSpeed;
    let directionY = (Math.random() - 0.5) * bubbleSpeed;
    if (startsFromBottom) {
      directionY = -Math.abs(directionY); // Move upwards initially
    }

    bubble.style.left = x + "px";
    bubble.style.top = y + "px";

    setInterval(() => {
      x += directionX;
      y += directionY;

      if (x < 0 || x > containerRect.width - bubbleDiameter) directionX *= -1;
      if (y < 0 || y > containerRect.height - bubbleDiameter) directionY *= -1;

      bubble.style.left = x + "px";
      bubble.style.top = y + "px";
    }, 20);
  }

  const facts = [
    "A group of flamingos is called a 'flamboyance'.",
    "Honey never spoils.",
    "Bananas are berries.",
    "Koalas sleep up to 22 hours a day.",
    "A day on Venus is longer than a year on Venus.",
    "Strawberries are not berries.",
  ];

  // Create bubbles with a slight delay to ensure better distribution
  facts.forEach((fact, index) => {
    setTimeout(() => createBubble(bubblesContainer, fact), index * 2000);
  });

  const socket = io();
  socket.emit("joinSession", "session123");

  // Listen for admin action to start the scene
  socket.on("adminAction", (action) => {
    if (action === "playScene") {
      window.location.href = "game-first-scene.html";
    }
  });
});
