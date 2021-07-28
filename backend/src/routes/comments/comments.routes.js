const { Router } = require('express');

const {
  ensureauthenticated,
  ensureauthorized,
} = require('../../middlewares/auth-middleware');
const { createComment, deleteComment } = require('./comments.controllers');

const router = Router();

router.post('/', ensureauthenticated, createComment);

router.delete('/:id', ensureauthenticated, deleteComment);

module.exports = router;
