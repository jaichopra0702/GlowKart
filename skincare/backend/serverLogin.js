const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 7000;
const FILE_PATH = path.join(__dirname, 'record1.txt');
const cors = require('cors');
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to handle user registration
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    console.error('Missing required fields:', req.body);
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Read existing content of record1.txt
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error reading file' });
    }

    // Parse existing data or initialize an empty array
    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
        if (!Array.isArray(users)) {
          throw new Error('Invalid JSON format: expected an array');
        }
      } catch (parseError) {
        console.warn('Error parsing JSON, initializing empty array:', parseError);
        users = [];
      }
    }

    // Create and add new user
    const newUser = { name, email, password };
    users.push(newUser);

    // Write updated data to file
    fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error saving data:', writeErr);
        return res.status(500).json({ message: 'Error saving data' });
      }

      console.log('User data saved:', newUser);
      res.status(200).json({ message: 'User data saved successfully' });
    });
  });
});

// POST endpoint to handle user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    console.error('Missing required fields:', req.body);
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Read existing content of record1.txt
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error reading file' });
    }

    // Parse existing data or initialize an empty array
    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
        if (!Array.isArray(users)) {
          throw new Error('Invalid JSON format: expected an array');
        }
      } catch (parseError) {
        console.warn('Error parsing JSON, initializing empty array:', parseError);
        users = [];
      }
    }

    // Check if user exists
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      console.log('User logged in:', user);
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
