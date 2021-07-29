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

router.get('/', async (req, res) => {
  await getVideos(req, res);
});

router.get('/top', async (req, res) => {
  await getTopVideos(req, res);
});

router.get('/:id', async (req, res) => {
  await getSingleVideo(req, res);
});

router.post(
  '/',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    await createVideo(req, res);
  },
);

router.put(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    await updateVideo(req, res);
  },
);

router.delete(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    await deleteVideo(req, res);
  },
);

module.exports = router;
