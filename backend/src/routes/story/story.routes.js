const path = require('path');

const { Router } = require('express');
const multer = require('multer');

const {
  ensureauthenticated,
  ensureauthorized,
} = require('../../middlewares/auth-middleware');

const router = Router();

const {
  createStory,
  deleteStory,
  getSingleStory,
  getStories,
  updateStory,
  getOneBySlug,
  getTopStories,
} = require('./story.controllers');

const PATH = '../../public';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, PATH));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalName);
    req.body.imageUrl = fileName;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

router.get('/', async (req, res) => {
  // #swagger.tags = ['Posts']
  await getStories(req, res);
});

router.get('/top', async (req, res) => {
  // #swagger.tags = ['Posts']
  await getTopStories(req, res);
});

router.get('/slug/:slug', async (req, res) => {
  // #swagger.tags = ['Posts']
  await getOneBySlug(req, res);
});

router.post(
  '/',
  ensureauthenticated,
  ensureauthorized(['admin']),
  upload.any('files'),
);

router.post(
  '/',
  ensureauthenticated,
  ensureauthorized(['admin']),
  async (req, res) => {
    /*  #swagger.tags = ['Posts']
        #swagger.consumes = ['multipart/form-data']
        #swagger.security = [{
        "Authorization": []
        }]
        #swagger.parameters['file'] = {
            in: 'formData',
            required: true,
            type: 'file'
        }
      
    	#swagger.parameters['category'] = {
            in: 'formData',
            required: true,
            type: 'string',
      } 
      #swagger.parameters['title'] = {
            in: 'formData',
            required: true,
            type: 'string',
      } 
      #swagger.parameters['body'] = {
            in: 'formData',
            required: true,
            type: 'string',
      } 
    
    */
    await createStory(req, res);
  },
);

router.get('/:id', async (req, res) => {
  // #swagger.tags = ['Posts']
  await getSingleStory(req, res);
});

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
            schema: { $ref: "#/definitions/StoryModel" }
    } */
    await updateStory(req, res);
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
    await deleteStory(req, res);
  },
);

module.exports = router;
