const express = require('express');

const app = express();

const artistControllers = require('./controllers/artists');

const albumControllers = require('./controllers/albums');

app.use(express.json());


app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

app.get('/artists/:artistId', artistControllers.getArtistById);

app.patch('/artists/:id', artistControllers.newInfo);

app.delete('/artists/:id', artistControllers.deletedArtist);

// Albums section below //

app.post('/artists/:artistId/albums', albumControllers.newAlbum);

// app.get('/albums', albumControllers.list);

module.exports = app;