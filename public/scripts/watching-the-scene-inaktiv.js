function redirectToPage(url, delay) {
  setTimeout(function () {
    window.location.href = url;
  }, delay);
}

// Example usage: Redirect to "target.html" after 5 seconds (5000 milliseconds)
window.onload = function () {
  redirectToPage("waiting-for-question.html", 5000);
};
