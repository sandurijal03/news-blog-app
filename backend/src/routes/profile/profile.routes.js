const { Router } = require('express');

const { ensureauthenticated } = require('../../middlewares/auth-middleware');
const { getSingleUser, updateUser } = require('./profile.controllers');

const router = Router();

router.get('/', ensureauthenticated, async (req, res) => {
  /*  #swagger.tags = ['Profile']
        #swagger.security = [{
        "Authorization": []
        }]
    */
  await getSingleUser(req, res);
});

router.put('/:id', ensureauthenticated, async (req, res) => {
  /*  #swagger.tags = ['Profile']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/UpdateUserModel" }
    } */
  await updateUser(req, res);
});

module.exports = router;
