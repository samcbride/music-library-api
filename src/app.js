const express = require('express');

const app = express();

const artistControllers = require('./controllers/artists');

app.use(express.json());

app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

// app.get('/artists/:artistId', artistControllers.user);

app.get('/artists/:artistId', artistControllers.getArtistById);

app.patch('/artists/:id', artistControllers.newInfo);

module.exports = app;