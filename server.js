//  server.js creates the server
// putting in a lot of comments in this one! trying to understand everything while i'm coding :) 

// import express
const express = require('express');
// so you don't have to deal with all the relative pathing
const path = require('path');
const fs = require('fs');
// const util = require('util');

// connecting the db.json file where the user will store their notes
const dbData = require('./db/db.json');
const uuid = require('./helpers/uuid');

// Initialize app variable
const app = express();
// port # when starting the app, will find available port
const PORT = process.env.port || 3001;


// Middleware for parsing JSON and urlencoded form data --> to combine different softwares with express
app.use(express.urlencoded({ extended: true })); // to pass data through the URL
app.use(express.json());
// app.use('/api', api);

// Add a static middleware for serving assets in the public folder --> telling express the location where all of our client side/html functionalities are 
app.use(express.static('public'));

// GET REQUEST
// reading the db file, setting up a route , '/' -> root path or URL to create a new path, call back function -> req(request), res(response)
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

// POST REQUEST --> activity 15 & 17
// when user writes in the a new note, it should add it to the db.json file
// append data to the page
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;
    // let title = req.body.title;
    // let text = req.body.text;

    if (title && text) {
      const newNote = {
        title, 
        text,
        id: uuid(),
      };

      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);

          parsedNotes.push(newNote);
          
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 2),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });

      const response = {
        status: 'success',
        body: newNote,
      };

      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(400).json('Request body must at least contain a note');
    }
});

// DELETE REQUEST - BONUS 
// when user wants to delete their note, it will be deleted from the db.json file
// app.delete('/api/notes', (req, res) => {

// })

// CREATION OF THE SERVER
// this is what is actually creating the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


        // // using activity 19 - Convert the data to a string so we can save it
        // const noteString = JSON.stringify(newNote);

        // // Write the string to a file -> writeFileAsync,appendFile
        // fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
        //   err
        //     ? console.error(err)
        //     : console.log(
        //         `Review for ${newNote.title} has been written to JSON file`
        //       )
        // );