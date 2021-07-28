const { Router } = require('express');

const {
  ensureauthenticated,
  ensureauthorized,
} = require('../../middlewares/auth-middleware');
const { getAllAdmin, getSingleAdmin } = require('./admin.controllers');

const router = Router();

router.get(
  '/users',
  ensureauthenticated,
  ensureauthorized(['admin']),
  getAllAdmin,
);

router.get(
  '/users/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  getSingleAdmin,
);

module.exports = router;
