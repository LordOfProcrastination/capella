const consequenceMessage = localStorage.getItem("consequenceTxt");

let chapterIndex = parseInt(localStorage.getItem("chapterIndex"), 10) || 1;

const consequenceOutput = document.querySelector("#consequence-output");
const storyTime = () => {
  consequenceOutput.innerHTML = `
        <h4>Your action had consequences...</h4>
        <span>${consequenceMessage}</span>
    `;
};
storyTime();

function redirectToPage(url, delay) {
  setTimeout(function () {
    window.location.href = url;
  }, delay);
}

// Example usage: Redirect to "target.html" after 5 seconds (5000 milliseconds)
window.onload = function () {
  if (chapterIndex < 6) {
    chapterIndex++;
    localStorage.setItem("chapterIndex", chapterIndex);
    redirectToPage("watching-the-scene-innaktiv.html", 10000);
  } else {
    redirectToPage("user-ending.html", 10000);
  }
};

/*
    if (chapterIndex < 5) {
      chapterIndex++;
      localStorage.setItem("chapterIndex", chapterIndex);
      nextChapter();
    } else {
      localStorage.clear();
      chapterIndex = 1;
      console.log("Reached the last chapter. LocalStorage cleared.");
      eventMessage.innerHTML = "You've reached the end of the adventure.";
    }
  }, timerDuration);
*/
