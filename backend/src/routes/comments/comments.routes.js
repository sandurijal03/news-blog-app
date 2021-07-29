const { Router } = require('express');

const { ensureauthenticated } = require('../../middlewares/auth-middleware');
const { createComment, deleteComment } = require('./comments.controllers');

const router = Router();

router.post('/', ensureauthenticated, async (req, res) => {
  await createComment(req, res);
});

router.delete('/:id', ensureauthenticated, async (req, res) => {
  await deleteComment(req, res);
});

module.exports = router;
