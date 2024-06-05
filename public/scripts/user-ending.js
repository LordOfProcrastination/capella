const endBtn = document.querySelector("#end-btn");
function redirectToPage(url) {
  window.location.href = url;
}

const endGame = () => {
  redirectToPage("user-ending-rating.html");
  localStorage.clear();
};

endBtn.addEventListener("click", endGame);
