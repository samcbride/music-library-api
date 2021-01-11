const { Album, Artist } = require('../models');
// const album = require('../models/album');

// const list = (req, res) => {
//     Artists.findAll().then((artists) => res.status(200).json(artists));
// };

const newAlbum = (req, res) => {
    const { artistId } = req.params;
    Artist.findByPk(artistId).then((artist) => {
        if(!artist) {
            res.status(404).json({ error: 'The artist could not be found.' });
        } else {
            const data = req.body;
            data.artistId = req.params.artistId;
            console.log(data.artistId);
            Album.create(data, { include: "artist" }).then((album) => {
                console.log(album);
                res.status(201).json(album);
            });
        }
    });
};

  module.exports = {
    // list,
    newAlbum
  };