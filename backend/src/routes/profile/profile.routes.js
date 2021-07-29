const { Router } = require('express');

const { ensureauthenticated } = require('../../middlewares/auth-middleware');
const { getSingleUser, updateUser } = require('./profile.controllers');

const router = Router();

router.get('/', ensureauthenticated, async (req, res) => {
  await getSingleUser(req, res);
});

router.put('/:id', ensureauthenticated, async (req, res) => {
  await updateUser(req, res);
});

module.exports = router;
