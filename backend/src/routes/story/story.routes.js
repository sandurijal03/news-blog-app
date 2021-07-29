const { Router } = require('express');

const {
  ensureauthenticated,
  ensureauthorized,
} = require('../../middlewares/auth-middleware');

const router = Router();

const {
  createStory,
  deleteStory,
  getSingleStory,
  getStories,
  updateStory,
  getOneBySlug,
  getTopStories,
} = require('./story.controllers');

router.get('/', async (req, res) => {
  await getStories(req, res);
});

router.get('/top', async (req, res) => {
  await getTopStories(req, res);
});

router.get('/slug/:slug', async (req, res) => {
  await getOneBySlug(req, res);
});

router.post(
  '/',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    await createStory(req, res);
  },
);

router.get('/:id', async (req, res) => {
  await getSingleStory(req, res);
});

router.put(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    await updateStory(req, res);
  },
);

router.delete(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    await deleteStory(req, res);
  },
);

module.exports = router;
