document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 100; // Number of snowflakes

    for (let i = 0; i < snowflakeCount; i++) {
        let snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Random size between 2px and 6px
        let size = Math.random() * 4 + 2 + 'px';
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

function addNewHeading(id, message) {
    const newHeading = document.createElement('h1');
    newHeading.id = id;
    newHeading.textContent = message;
    document.body.appendChild(newHeading); // Legger til overskriften på slutten av <body>
}

// Kall funksjonen for å legge til overskriften der du trenger den
addNewHeading('uniqueHeading', 'NAME REGISTER');


// Liste over forbudte ord
const forbiddenWords = [
    "Homofil", "Svarting", "Blackface", // Legg til de forbudte ordene her
    "Fag", "Transe"
];

function isNameValid(name) {
    // Sjekk om navnet inneholder noen av de forbudte ordene
    const lowerCaseName = name.toLowerCase();
    return !forbiddenWords.some(word => lowerCaseName.includes(word));
}

function submitName() {
    const nameInput = document.getElementById('nameInput').value;
    if (nameInput) {
        if (isNameValid(nameInput)) {
            alert('Navn registrert: ' + nameInput);
            // Implement further actions here
        } else {
            alert('Navnet inneholder upassende ord. Vennligst skriv inn et annet navn.');
        }
    } else {
        alert('Vennligst skriv inn navn.');
    }
}

// Koble funksjonen til knappen
document.getElementById('submitNameButton').addEventListener('click', submitName);
