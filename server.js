const express = require("express");
const app = express();
const path = require('path');
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname + '/style.css'));
});

app.get("/script.js", (req, res) => {
    res.sendFile(path.join(__dirname + '/script.js'));
});

app.get("/menu.json", (req, res) => {
    res.sendFile(path.join(__dirname + '/menu.json'));
})



app.listen(process.env.PORT || port);