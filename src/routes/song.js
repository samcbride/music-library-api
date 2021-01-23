const express = require('express');

const router = express.Router();
const songController = require('../controllers/songs');

router
  .route('/')
  .get(songController.list);

router
  .route('/:id')
  .get(songController.getSongById)
  .patch(songController.updatedInfo)
  .delete(songController.deletedSong);

module.exports = router;