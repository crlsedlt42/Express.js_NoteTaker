// Initizlizing and getting dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { strigify } = require('querystring');

// Setting up PORT
const PORT = process.env.PORT || 3001;

// Setting up Express App
const app = express();

// Creating an array for notes
//let createNoteData = [];

// Setting middleware body for parsing, static, and route
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.static(path.join(__dirname, 'public')));

// -- API call response for notes, and having results sent to browser as JSON
// -- Write a new note to the JSON file and send it back to browswer
// -- Delete a note from the JSON file and send it back to the browser

// HTML GET Requests

// // GET is started by buttton click
// app.get('/api/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/notes.html'));
// });

// API GET Requests
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

// API DELETE Requests
app.delete('/api/notes/:id', (req, res) => {

    const notesID = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNotes = notes.filter((note) => note.id !== notesID);

        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
            if (err) throw err;
            res.json(newNotes);

        });
    });
});

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});


// Route if no match is found, then user is taken to home page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Port is listening and server is running
app.listen(PORT, () => {
    console.log(`Success! Server is running on: ${PORT}`);
});
