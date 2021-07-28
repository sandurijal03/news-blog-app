const { Router } = require('express');

const {
  ensureauthenticated,
  ensureauthorized,
} = require('../../middlewares/auth-middleware');

const router = Router();

const {
  createVideo,
  deleteVideo,
  getSingleVideo,
  getTopVideos,
  getVideos,
  updateVideo,
} = require('./video.controllers');

router.get('/', getVideos);

router.get('/top', getTopVideos);

router.get('/:id', getSingleVideo);

router.post('/', ensureauthenticated, ensureauthorized(['admin']), createVideo);

router.put(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  updateVideo,
);

router.delete(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  deleteVideo,
);

module.exports = router;
