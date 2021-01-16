const express = require('express');

const app = express();

const artistControllers = require('./controllers/artists');

const albumControllers = require('./controllers/albums');

const songControllers = require('./controllers/songs');

app.use(express.json());

// Artists section below //

app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

app.get('/artists/:artistId', artistControllers.getArtistById);

app.patch('/artists/:id', artistControllers.newInfo);

app.delete('/artists/:id', artistControllers.deletedArtist);

// Albums section below //

app.post('/artists/:artistId/albums', albumControllers.newAlbum);

app.get('/albums', albumControllers.list);

app.get('/albums/:albumId', albumControllers.getAlbumById);

app.patch('/albums/:id', albumControllers.updatedInfo);

app.delete('/albums/:id', albumControllers.deletedAlbum);

// Songs section below //

app.post('/albums/:albumId/songs', songControllers.create);

app.get('/songs', songControllers.list);

app.get('/songs/:songId', songControllers.getSongById);

app.patch('/songs/:id', songControllers.updatedInfo);

app.delete('/songs/:id', songControllers.deletedSong);

module.exports = app;