//  server.js creates the server
// putting in a lot of comments in this one! trying to understand everything while i'm coding :) 

// import express
const express = require('express');
// so you don't have to deal with all the relative pathing
const path = require('path');
const fs = require('fs');
// connecting the db.json file where the user will store their notes
const dbData = require('./db/db.json');

// Initialize app variable
const app = express();
// port # when starting the app, will find available port
const PORT = process.env.port || 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/api', api);

// Add a static middleware for serving assets in the public folder
// telling express the location where all of our client side/html functionalities are 
app.use(express.static('public'));

// GET REQUEST 
// reading the db file 
// setting up a route 
// '/' -> root path or URL to create a new path 
// call back function -> req(request), res(response)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

// .get method - user end perspective - getting the html file from the server
app.get('/notes', (req, res) => 
    // __dirname is the parent folder
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// create api route on the server side
app.get('/api/notes', (req, res) => res.json(dbData));

// Fallback route for when a user attempts to visit routes that don't exist
app.get('*', (req, res) =>
  res.send(
    `Wrong URL. Please try again!`
  )
);

// POST REQUEST 
// when user writes in the a new note, it should add it to the db.json file
// append data to the page
app.post('/api.notes', (req, res) => {

})

// DELETE REQUEST - BONUS 
// when user wants to delete their note, it will be deleted from the db.json file
app.delete('/api.notes', (req, res) => {

})

// CREATION OF THE SERVER
// this is what is actually creating the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);