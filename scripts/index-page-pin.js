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
        alert('Vennligst skriv inn navn.');
    }
}