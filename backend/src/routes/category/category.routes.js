const { Router } = require('express');

const {
  ensureauthenticated,
  ensureauthorized,
} = require('../../middlewares/auth-middleware');
const {
  createCategory,
  deleteCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
} = require('./category.controllers');

const router = Router();

router.get('/', async (req, res) => {
  await getCategories(req, res);
});

router.post(
  '/',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    await createCategory(req, res);
  },
);

router.get('/:id', async (req, res) => {
  await getSingleCategory(req, res);
});

router.put(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    await updateCategory(req, res);
  },
);

router.delete(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    await deleteCategory(req, res);
  },
);

module.exports = router;
