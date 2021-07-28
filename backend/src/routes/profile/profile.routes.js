const { Router } = require('express');

const { ensureauthenticated } = require('../../middlewares/auth-middleware');
const { getSingleUser, updateUser } = require('./profile.controllers');

const router = Router();

router.get('/', ensureauthenticated, getSingleUser);

router.put('/:id', ensureauthenticated, updateUser);

module.exports = router;
