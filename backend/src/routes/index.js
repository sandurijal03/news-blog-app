const { Router } = require('express');

const router = Router();

const authRouter = require('./auth/auth.routes');
const adminRouter = require('./admin/admin.routes');
const categoryRouter = require('./category/category.routes');
const commentRouter = require('./comments/comments.routes');
const profileRouter = require('./profile/profile.routes');
const storyRouter = require('./story/story.routes');
const videoRouter = require('./video/video.routes');

router.use('/api/auth', authRouter);
router.use('/api', adminRouter);
router.use('/api/category', categoryRouter);
router.use('/api/comments', commentRouter);
router.use('/api/profile', profileRouter);
router.use('/api/stories', storyRouter);
router.use('/api/videos', videoRouter);

module.exports = router;
