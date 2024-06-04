//.............SIDE BAR FUNCTIONS ...................

document.querySelectorAll(".sidebar p").forEach(function (p) {
  p.addEventListener("click", function () {
    // Remove the 'clicked' class from all <p> tags
    document.querySelectorAll(".sidebar p").forEach(function (p) {
      p.classList.remove("clicked");
    });
    // Add the 'clicked' class to the clicked <p> tag
    p.classList.add("clicked");
  });
});

//.............PIN FUNCTIONS ...................
document
  .getElementById("generate-pin-btn")
  .addEventListener("click", function () {
    alert("Button clicked!");
  });
