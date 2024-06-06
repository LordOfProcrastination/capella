const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let users = {};

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Received registration request for username: ${username}`);

    if (users[username]) {
        console.log('Username already exists');
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = hashedPassword;

    console.log('Registered users:', users);  // Log registered users to the console

    res.status(200).json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Received login request for username: ${username}`);

    const hashedPassword = users[username];

    if (!hashedPassword || !await bcrypt.compare(password, hashedPassword)) {
        console.log('Invalid username or password');
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log('Login successful');
    res.status(200).json({ message: 'Login successful' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
