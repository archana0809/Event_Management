require('dotenv').config(); // Correctly load environment variables

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db'); // Ensure this file exists and correctly connects to MongoDB
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 5000; // Use the correct environment port or default to 5000

// Connect to MongoDB database
connectDB(); // Make sure this function is properly set up to connect to MongoDB

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); // Parse JSON data

// Serve static files (e.g., images, CSS, JS from 'public' folder)
app.use(express.static('public'));

// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret', // Use a secret from .env file
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // Cookie expires after 7 days
    },
  })
);

// Flash messages middleware
app.use(flash()); // Make sure `connect-flash` is initialized properly

// Templating engine setup
app.use(expressLayout); // Ensure express-ejs-layouts is set up
app.set('layout', './layouts/main'); // Use the correct path to your layout
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Routes
app.use('/', require('./server/routes/customer')); // Ensure customer routes exist

// Home route
app.get('/', (req, res) => {
  const locals = {
    title: 'Project',
    description: 'Event Management System',
  };
  res.render('index', locals); // Ensure index.ejs exists in the 'views' directory
});

// 404 route
app.get('*', (req, res) => {
  res.status(404).render('404'); // Ensure 404.ejs exists in the 'views' directory
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`); // Confirm the server is running
});

// Dashboard route (or Home route)
app.get('/dashboard', (req, res) => {
  const locals = {
    title: 'Dashboard',
    description: 'Manage Your Customers and Events'
  };
  res.render('dashboard', locals); // Render your dashboard page (dashboard.ejs)
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // you can customize the storage

app.post('/add', upload.single('image'), (req, res) => {
  console.log(req.body);       // form fields
  console.log(req.file);       // uploaded file details

  // Access file path: req.file.path
  // Save image info to DB if needed
app.use(express.static('public'));

  res.redirect('/');
});
