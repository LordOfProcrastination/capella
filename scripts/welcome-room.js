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

  // Animate bubbles
  const bubblesContainer = document.querySelector(".bubbles");

  function createBubble(container, text) {
    let bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    container.appendChild(bubble);

    animateBubble(bubble);
  }

  function animateBubble(bubble) {
    const bubbleSpeed = 1;
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 100);
    let directionX = (Math.random() - 0.5) * bubbleSpeed;
    let directionY = (Math.random() - 0.5) * bubbleSpeed;

    setInterval(() => {
      x += directionX;
      y += directionY;

      if (x < 0 || x > window.innerWidth - 100) directionX *= -1;
      if (y < 0 || y > window.innerHeight - 100) directionY *= -1;

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

  // Create bubbles with facts
  facts.forEach((fact) => createBubble(bubblesContainer, fact));
});
