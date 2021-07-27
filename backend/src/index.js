const { config } = require('dotenv');
config();

const express = require('express');
const cors = require('cors');
const paginate = require('express-paginate');
const passport = require('passport');
const connectDB = require('./db/connectDB');

const app = express();

const runServer = async () => {
  try {
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(passport.initialize());

    app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT));

    app.get('/', (req, res) => {
      res.status(200).json({ success: true });
    });

    const port = process.env.PORT;
    app.listen(port, () => console.log(`listening to server on port ${port}`));
  } catch (err) {
    console.log(err.message);
    runServer();
  }
};

runServer();
