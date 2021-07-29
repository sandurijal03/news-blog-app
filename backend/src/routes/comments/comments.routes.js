const { Router } = require('express');

const { ensureauthenticated } = require('../../middlewares/auth-middleware');
const { createComment, deleteComment } = require('./comments.controllers');

const router = Router();

router.post('/', ensureauthenticated, async (req, res) => {
  /*  #swagger.tags = ['Posts']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/CommentModel" }
    } */
  await createComment(req, res);
});

router.delete('/:id', ensureauthenticated, async (req, res) => {
  /*  #swagger.tags = ['Posts']
        #swagger.security = [{
        "Authorization": []
        }]
    */
  await deleteComment(req, res);
});

module.exports = router;
