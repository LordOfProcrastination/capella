document
  .getElementById("login-btn")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const loginError = document.getElementById("login-error");

    if (!username || !password) {
      loginError.textContent = "Both fields are required.";
      return;
    }

    // Send the login data to the server
    try {
      const response = await fetch("http://localhost:3000/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        loginError.textContent = "";
        window.location.href = "admin-page.html"; // Redirect to admin page
      } else {
        const data = await response.json();
        loginError.textContent = `Login failed: ${data.message}`;
      }
    } catch (error) {
      console.error("Error during login:", error);
      loginError.textContent = "An error occurred during login.";
    }
  });
