/*
document.getElementById('startButton').addEventListener('click', goToNextPage);

function goToNextPage() {
    const pinInput = document.getElementById('pinInput').value;
    const correctPin = "1234";  // Angi riktig PIN-kode her
    console.log("Input PIN: " + pinInput);  // Debugging: Skriv ut den innskrevne PIN-koden
    if (pinInput === correctPin) {
        console.log("Correct PIN entered.");  // Debugging: PIN-koden er korrekt
        document.getElementById('landingPage').style.display = 'none';
        document.getElementById('nameRegisterPage').style.display = 'block';
    } else {
        console.log("Incorrect PIN entered.");  // Debugging: Feil PIN-kode
        alert('Feil PIN. Vennligst prøv igjen.');
    }
}

function submitName() {
    const nameInput = document.getElementById('nameInput').value;
    if (nameInput) {
        alert('Navn registrert: ' + nameInput);
        // Implement further actions here
    } else {
        alert('Vennligst skriv inn riktig pin.');
    }
} 
*/


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