// Initizlizing and getting dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Setting up Express App
const app = express();

// Setting up PORT
const PORT = process.env.PORT || 3001;

// Creating an array for notes
let createNoteData = [];

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

// GET is started by buttton click
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Route if no match is found, then user is taken to home page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API GET Requests
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'));
});

// Port is listening and server is running
app.listen(PORT, () => {
    console.log(`Success! Server is running on: ${PORT}`);
});
