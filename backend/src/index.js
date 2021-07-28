const { config } = require('dotenv');
config();

const express = require('express');
const cors = require('cors');
const paginate = require('express-paginate');
const passport = require('passport');
const connectDB = require('./db/connectDB');

const authRouter = require('./routes/auth/auth.routes');
const adminRouter = require('./routes/admin/admin.routes');
const categoryRouter = require('./routes/category/category.routes');
const commentRouter = require('./routes/comments/comments.routes');
const profileRouter = require('./routes/profile/profile.routes');
const storyRouter = require('./routes/story/story.routes');
const videoRouter = require('./routes/video/video.routes');

require('./middlewares/passport-middleware')(passport);

const app = express();

const runServer = async () => {
  try {
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(passport.initialize());

    app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT));

    app.use('/api/auth', authRouter);
    app.use('/api', adminRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/comments', commentRouter);
    app.use('/api/profile', profileRouter);
    app.use('/api/stories', storyRouter);
    app.use('/api/videos', videoRouter);

    const port = process.env.PORT;
    app.listen(port, () => console.log(`listening to server on port ${port}`));
  } catch (err) {
    console.log(err.message);
    runServer();
  }
};

runServer();
