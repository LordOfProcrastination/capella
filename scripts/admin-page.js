//.............SIDE BAR FUNCTIONS ...................

//.............PIN FUNCTIONS ...................
document
  .getElementById("generate-pin-btn")
  .addEventListener("click", function () {
    alert("Button clicked!");
  });

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
