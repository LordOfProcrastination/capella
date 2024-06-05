document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 200; // Number of snowflakes

    for (let i = 0; i < snowflakeCount; i++) {
        let snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Random size between 2px and 6px
        let size = Math.random() * 3 + 1 + 'px';
        snowflake.style.width = size;
        snowflake.style.height = size;

        // Random horizontal position
        snowflake.style.left = Math.random() * 18 + 'vw';

        // Random animation duration between 3s and 10s
        snowflake.style.animationDuration = Math.random() * 7 + 3 + 's';

        // Random delay before the animation starts
        snowflake.style.animationDelay = Math.random() * 5 + 's';

        snowContainer.appendChild(snowflake);
    }
});


document.getElementById('pin-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const enteredPin = document.getElementById('pin').value;
    const correctPin = '1234'; // Set your correct PIN here
    
    const messageElement = document.getElementById('message');
    
    if (enteredPin === correctPin) {
        messageElement.textContent = 'Riktig PIN.';
        messageElement.style.color = 'green';
        
        // Redirect to another page after a short delay
        setTimeout(() => {
            window.location.href = 'http://127.0.0.1:5500/public/Landing-page-name.html'; // Change 'welcome.html' to your target page
        }, 1000); // 1 second delay for the user to see the success message
    } else {
        messageElement.textContent = 'Feil PIN. Vennligst prøv igjenn.';
        messageElement.style.color = 'red';
    }
    
    // Clear the input field
    document.getElementById('pin').value = '';
});