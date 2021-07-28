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

router.get('/', getStories);

router.get('/top', getTopStories);

router.get('/slug/:slug', getOneBySlug);

router.post('/', ensureauthenticated, ensureauthorized(['admin']), createStory);

router.get('/:id', getSingleStory);

router.put(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  updateStory,
);

router.delete(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  deleteStory,
);

module.exports = router;
