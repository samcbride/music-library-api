const { Album, Artist } = require('../models');
const album = require('../models/album');

const newAlbum = (req, res) => {
    const { artistId } = req.params;
    Artist.findByPk(artistId).then((artist) => {
        if(!artist) {
            res.status(404).json({ error: 'The artist could not be found.' });
        } else {
            // const data = req.body;
            // data.artistId = req.params.artistId;
            Album.create({...req.body, artistId: req.params.artistId}).then((album) => {
                res.status(201).json(album);
            });
        }
    });
};

const list = (req, res) => {
    Album.findAll().then((album) => res.status(200).json(album));
};

const getAlbumById = (req, res) => {
    const { albumId } = req.params;
    Album.findByPk(albumId).then((album) => {
        if(!album) {
            res.status(404).json({ error: 'The album could not be found.'});
        } else {
            res.status(200).json(album);
        }
    });
};

const updatedInfo = (req, res) => {
    const { id } = req.params;
    Album.update(req.body, { where: { id } }).then(([updatedAlbum]) => {
        if(!updatedAlbum) {
            res.status(404).json({ error: 'The album could not be found.' });
        } else {
            res.status(200).json(updatedAlbum);
        }
    });
};

const deletedAlbum = (req, res) => {
    const { id } = req.params;
    Album.destroy( { where: { id } } ).then((updatedAlbum) => {
        if(!updatedAlbum) {
            res.status(404).json({ error: 'The album could not be found.'});
        } else {
            res.status(204).json(updatedAlbum);
        }
    });
};

  module.exports = {
    newAlbum,
    list,
    getAlbumById,
    updatedInfo,
    deletedAlbum
  };