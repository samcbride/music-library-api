const express = require('express');

const router = express.Router();
const artistController = require('../controllers/artists');
const albumController = require('../controllers/albums');

router
  .route('/')
  .get(artistController.list)
  .post(artistController.create);

router
  .route('/:id')
  .get(artistController.getArtistById)
  .patch(artistController.newInfo)
  .delete(artistController.deletedArtist);

router
  .route('/:id/albums')
  .post(albumController.newAlbum);

module.exports = router;