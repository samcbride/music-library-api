const express = require('express');

const router = express.Router();
const albumController = require('../controllers/albums');
const songController = require('../controllers/songs');
 
router
  .route('/')
  .get(albumController.list);

router
  .route('/:id')
  .get(albumController.getAlbumById)
  .patch(albumController.updatedInfo)
  .delete(albumController.deletedAlbum);

router
  .route('/:id/songs')
  .post(songController.create);

module.exports = router;
