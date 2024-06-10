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

// Example usage: Redirect to "target.html" after 5 seconds (5000 milliseconds)'

/* Temp
window.onload = function () {
  if (chapterIndex < 5) {
    chapterIndex++;
    localStorage.setItem("chapterIndex", chapterIndex);
    redirectToPage("game-watching-the-scene.html", 10000);
  } else {
    redirectToPage("game-ending-result.html", 10000);
  }
};
*/
