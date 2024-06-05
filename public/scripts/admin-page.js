//.............SIDE BAR FUNCTIONS ...................

//.............PIN FUNCTIONS ...................

document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("generate-pin-btn")
    .addEventListener("click", generatePin);
});

function generatePin() {
  let pin = Math.floor(100000 + Math.random() * 900000);
  let pinString = pin.toString();
  let formattedPin = pinString.slice(0, 3) + " " + pinString.slice(3);
  document.querySelector("#pin-code").innerText = formattedPin;
}
//------------------------------API FUNCTIONS -------------------------------

fetch("http://localhost:3000/api/storyAPI")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
//--------------------------------------------------------------------------
