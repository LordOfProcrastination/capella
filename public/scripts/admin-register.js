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
