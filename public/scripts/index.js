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

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.addEventListener("DOMContentLoaded", () => {
  const applyEffect = (element, iterationIncrement) => {
    let iteration = 0;
    let interval = setInterval(() => {
      element.innerText = element.dataset.value
        .split("")
        .map((letter, index) => {
          if (index < Math.floor(iteration)) {
            return element.dataset.value[index];
          }

          if (element.dataset.value[index] === " ") {
            return " ";
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= element.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += iterationIncrement / 3;
    }, 30);
  };
  const logoText = document.getElementById("logo-text");
  const startText = document.getElementById("start-text");
  const startBtn = document.getElementById("button");
  // const description = document.getElementById("description");

  if (logoText) applyEffect(logoText, 1);
  if (startText) applyEffect(startText, 1);
  if (startBtn) applyEffect(startBtn, 1);
  // if (description) applyEffect(description, 6);
});

// snow effect
// credit: @https://codepen.io/RoskQQ/pen/njXmxW

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//Canvas dimentions
var W = window.innerWidth,
  H = window.innerHeight;
canvas.width = W;
canvas.height = H;
var particles = [];
var x = 100;
var y = 100;

for (var i = 0; i < 100; i++) {
  particles.push(new creat_particle());
}

//function for multiple particles
function creat_particle() {
  this.x = Math.random() * W;
  this.y = Math.random() * H;

  //velocity of balls
  this.vx = Math.random() * 4 - 1;
  this.vy = Math.random() * 4 + 1;

  //Random Color
  var a = Math.random() * 1;
  this.color = "rgba(" + 255 + "," + 255 + "," + 255 + "," + a + ")";

  //random size
  this.radius = Math.random() * 2 + 2;
}
//Particles Animation
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Particls from array

  for (var t = 0; t < particles.length; t++) {
    var p = particles[t];

    ctx.beginPath();
    //balls color
    var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
    gradient.addColorStop(1, p.color);
    gradient.addColorStop(1, "rgb(66, 66, 66)");

    ctx.fillStyle = gradient;
    ctx.arc(p.x, p.y, p.radius, Math.PI * 2, false);

    ctx.fill();
    //velocity
    p.x += p.vx;
    p.y += p.vy;

    //boundaries
    if (p.x < -50) p.x = W + 50;
    if (p.y < -50) p.y = H + 50;
    if (p.x > W + 50) p.x = -50;
    if (p.y > H + 50) p.y = -50;
  }
}
setInterval(draw, 33);
