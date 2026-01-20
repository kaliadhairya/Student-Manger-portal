const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load Config
require('dotenv').config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Static Files
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/students', require('./routes/studentRoutes'));

// Route for serving HTML pages (Frontend)
app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views/login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views/register.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views/dashboard.html')));
// app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, 'views/profile.html'))); // Use dashboard as profile for now

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});