document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (!newUsername || !newPassword) {
        alert('Both fields are required.');
        return;
    }

    // Send the registration data to the server
    try {
        const response = await fetch('http://localhost:3000/admin-login.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: newUsername, password: newPassword })
        });

        if (response.ok) {
            alert('Registration successful!');
            document.getElementById('registrationForm').reset();
        } else {
            const data = await response.json();
            alert(`Registration failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration.');
    }
});

document.getElementById('loginButton').addEventListener('click', async function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        alert('Both fields are required.');
        return;
    }

    // Send the login data to the server
    try {
        const response = await fetch('http://localhost:3000/admin-login.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Login successful!');
            window.location.href = "http://127.0.0.1:5500/public/admin-page.html";
        } else {
            const data = await response.json();
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
});