const { Artist, Album } = require('../models');
const artist = require('../models/artist');
const album = require('../models/album');

const create = (req, res) => {
  Artist.create(req.body).then(artist => res.status(201).json(artist));
};

const list = (req, res) => {
  Artist.findAll().then(list => res.status(200).json(list)); 
};

const getArtistById = (req, res) => {
  const { artistId } = req.params;
  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(artist);
    }
  });
};

const newInfo = (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  console.log(id); // Remember to remove this
  Artist.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
    console.log(rowsUpdated); // Remember to remove this
  });
};

const deletedArtist = (req, res) => {
  const { id } = req.params;
  console.log(id); // Remember to remove this
  Artist.destroy( { where: { id } } ).then((rowsDeleted) => {
    console.log(rowsDeleted); // Remember to remove this
     if(!rowsDeleted) {
      res.status(404).json( { error: 'The artist could not be found.' });
    } else {
      res.status(204).json(rowsDeleted);
    }
  });
};

module.exports = {
  create,
  list,
  getArtistById,
  newInfo,
  deletedArtist
};