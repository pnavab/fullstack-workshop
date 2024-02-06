const express = require('express');
const bodyParser = require('body-parser'); //to parse the body request as JSON
const fs = require('fs'); //for using json as a database
const cors = require('cors'); //to accept requests from any origin
const port = 8000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define a route
app.get('/', (req, res) => {
  res.send('Hello backend world!');
});

app.post('/register', (req, res) => {
  console.log("register received ", req.body);
  const { username, password } = req.body;
  fs.readFile('./api/users.json', (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
      return;
    }

    let users = JSON.parse(data);
    
    // Check if the username already exists
    if (users.find(user => user.username === username)) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }
    
    // Add the new user to the array
    users.push({ username, password });
    
    // Write the updated users array back to the JSON file
    fs.writeFile('./api/users.json', JSON.stringify(users), (err) => {
      res.status(200).json({ message: 'Registration successful' });
    });
  });
});

app.post('/login', (req, res) => {
  console.log("login received ", req.body);
  const { username, password } = req.body;
  fs.readFile('./api/users.json', (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
      return;
    }

    let users = JSON.parse(data);
    
    const user = users.find(user => user.username === username);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // User authenticated successfully
    res.status(200).json({ message: 'Login successful' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
