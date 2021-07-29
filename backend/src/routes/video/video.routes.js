const { Router } = require('express');

const {
  ensureauthenticated,
  ensureauthorized,
} = require('../../middlewares/auth-middleware');

const router = Router();

const {
  createVideo,
  deleteVideo,
  getSingleVideo,
  getTopVideos,
  getVideos,
  updateVideo,
} = require('./video.controllers');

router.get('/', async (req, res) => {
  // #swagger.tags = ['Posts']
  await getVideos(req, res);
});

router.get('/top', async (req, res) => {
  // #swagger.tags = ['Posts']
  await getTopVideos(req, res);
});

router.get('/:id', async (req, res) => {
  // #swagger.tags = ['Posts']
  await getSingleVideo(req, res);
});

router.post(
  '/',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    /*  #swagger.tags = ['Posts']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/VideoModel" }
    } */
    await createVideo(req, res);
  },
);

router.put(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    /*  #swagger.tags = ['Posts']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/VideoModel" }
    } */
    await updateVideo(req, res);
  },
);

router.delete(
  '/:id',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    /*  #swagger.tags = ['Posts']
        #swagger.security = [{
        "Authorization": []
        }]
    */
    await deleteVideo(req, res);
  },
);

module.exports = router;
