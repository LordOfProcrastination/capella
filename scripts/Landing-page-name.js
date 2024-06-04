document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 100; // Antall snøfnugg

    // Generer snøfnugg
    for (let i = 0; i < snowflakeCount; i++) {
        let snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Tilfeldig størrelse mellom 2px og 6px
        let size = Math.random() * 4 + 2 + 'px';
        snowflake.style.width = size;
        snowflake.style.height = size;

        // Tilfeldig horisontal posisjon
        snowflake.style.left = Math.random() * 18 + 'vw';

        // Tilfeldig animasjonsvarighet mellom 3s og 10s
        snowflake.style.animationDuration = Math.random() * 7 + 3 + 's';

        // Tilfeldig forsinkelse før animasjonen starter
        snowflake.style.animationDelay = Math.random() * 5 + 's';

        snowContainer.appendChild(snowflake);
    }
})

// Liste over forbudte ord
const forbiddenWords = [
    "Homofil", "Svarting", "Blackface", // Legg til de forbudte ordene her
    "Fag", "Transe"
];

// Funksjon for å sjekke om navnet er gyldig
function isNameValid(name) {
    // Sjekk om navnet inneholder noen av de forbudte ordene
    const lowerCaseName = name.toLowerCase();
    return !forbiddenWords.some(word => lowerCaseName.includes(word.toLowerCase()));
}

// Funksjon for å vise feilmelding
function showError(message, isSuccess) {
    const errorBubble = document.getElementById('errorBubble');
    errorBubble.textContent = message;
    errorBubble.classList.toggle('success', isSuccess);
    errorBubble.style.display = 'block';
}

// Funksjon for å sende inn navnet
function submitName() {
    const nameInput = document.getElementById('nameInput').value;
    if (nameInput) {
        if (isNameValid(nameInput)) {
            showError('Navn registrert: ' + nameInput, true);
            setTimeout(() => {
                window.location.href = `http://127.0.0.1:5500/welcome-room.html?name=${encodeURIComponent(nameInput)}`;
            }, 2000); // Vent 2 sekunder før omdirigering
        } else {
            showError('Navnet inneholder upassende ord. Vennligst skriv inn et annet navn.', false);
        }
    } else {
        showError('Vennligst skriv inn navn.', false);
    }
}

// Koble funksjonen til knappen
document.getElementById('submitNameButton').addEventListener('click', submitName);
