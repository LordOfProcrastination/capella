document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    const registerError = document.getElementById("registerError");
    const registerSuccess = document.getElementById("registerSuccess");

    if (!newUsername || !newPassword) {
      registerError.textContent = "Both fields are required.";
      return;
    }

    // Send the registration data to the server
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      });

      if (response.ok) {
        registerSuccess.textContent = "Registration successful!";
        registerError.textContent = "";
        document.getElementById("registrationForm").reset();
      } else {
        const data = await response.json();
        registerError.textContent = `Registration failed: ${data.message}`;
        registerSuccess.textContent = "";
      }
    } catch (error) {
      console.error("Error during registration:", error);
      registerError.textContent = "An error occurred during registration.";
      registerSuccess.textContent = "";
    }
  });

document
  .getElementById("loginButton")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const loginError = document.getElementById("loginError");

    if (!username || !password) {
      loginError.textContent = "Both fields are required.";
      return;
    }

    // Send the login data to the server
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        loginError.textContent = "";
        window.location.href = "http://127.0.0.1:5500/public/Admin-Page.html"; // Redirect to admin page
      } else {
        const data = await response.json();
        loginError.textContent = `Login failed: ${data.message}`;
      }
    } catch (error) {
      console.error("Error during login:", error);
      loginError.textContent = "An error occurred during login.";
    }
  });
