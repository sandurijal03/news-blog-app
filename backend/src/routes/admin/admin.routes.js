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
  async (req, res) => {
    await getAllAdmin(req, res);
  },
);

router.get(
  '/users/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    await getSingleAdmin(req, res);
  },
);

module.exports = router;
