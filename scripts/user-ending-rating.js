// First stars
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");

  stars.forEach((star) => {
    star.addEventListener("click", setRating);
    star.addEventListener("mouseover", addHoverEffect);
    star.addEventListener("mouseout", removeHoverEffect);
  });

  function setRating(event) {
    const selectedStar = event.target;
    const ratingValue = selectedStar.getAttribute("data-value");

    stars.forEach((star) => {
      star.classList.remove("selected");
    });

    stars.forEach((star) => {
      if (star.getAttribute("data-value") <= ratingValue) {
        star.classList.add("selected");
      }
    });

    console.log(`Rated: ${ratingValue}`);
  }

  function addHoverEffect(event) {
    const hoverStar = event.target;
    const hoverValue = hoverStar.getAttribute("data-value");

    stars.forEach((star) => {
      if (star.getAttribute("data-value") <= hoverValue) {
        star.classList.add("hover");
      }
    });
  }

  function removeHoverEffect(event) {
    stars.forEach((star) => {
      star.classList.remove("hover");
    });
  }
});

// Second stars
document.addEventListener("DOMContentLoaded", () => {
  const starsContainer = document.querySelector(".star-rating2");
  const stars = starsContainer.querySelectorAll(".star2");

  stars.forEach((star) => {
    star.addEventListener("click", setRating);
    star.addEventListener("mouseover", addHoverEffect);
    star.addEventListener("mouseout", removeHoverEffect);
  });

  function setRating(event) {
    const selectedStar = event.target;
    const ratingValue = selectedStar.getAttribute("data-value");

    stars.forEach((star) => {
      star.classList.remove("selected");
    });

    stars.forEach((star) => {
      if (star.getAttribute("data-value") <= ratingValue) {
        star.classList.add("selected");
      }
    });

    console.log(`Rated: ${ratingValue}`);
  }

  function addHoverEffect(event) {
    const hoverStar = event.target;
    const hoverValue = hoverStar.getAttribute("data-value");

    stars.forEach((star) => {
      if (star.getAttribute("data-value") <= hoverValue) {
        star.classList.add("hover");
      }
    });
  }

  function removeHoverEffect(event) {
    stars.forEach((star) => {
      star.classList.remove("hover");
    });
  }
});

// Comment section
document.addEventListener("DOMContentLoaded", (event) => {
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentsContainer = document.getElementById("comments-container");

  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const commentText = commentInput.value.trim();

    if (commentText !== "") {
      addComment(commentText);
      commentInput.value = "";
    }
  });

  function addComment(text) {
    const comment = document.createElement("div");
    comment.className = "comment";
    const commentContent = document.createElement("p");
    commentContent.textContent = text;
    comment.appendChild(commentContent);
    commentsContainer.appendChild(comment);
  }
});
