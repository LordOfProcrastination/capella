const endBtn = document.querySelector("#end-btn");

const endGame = () => {
  redirectToPage("user-ending-rating.html");
  localStorage.clear();
};

endBtn.addEventListener("click", endGame);
