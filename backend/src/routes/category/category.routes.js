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

router.get('/', getCategories);

router.post(
  '/',
  ensureauthenticated,
  ensureauthorized(['admin']),
  createCategory,
);

router.get('/:id', getSingleCategory);

router.put(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  updateCategory,
);

router.delete(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  deleteCategory,
);

module.exports = router;
