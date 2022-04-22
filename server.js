const express = require('express');
const path = require('path');
const fs = require('fs');

// server setup
const app = express();
const PORT = process.env.port || 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

// Add a static middleware for serving assets in the public folder
app.use(express.static('public'));


// API ROUTES 

// GET REQUEST 
// reading the db file 

// POST REQUEST 

// DELETE REQUEST - BONUS 

// HTML ROUTES 

// LISTENING
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);