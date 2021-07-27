const { config } = require('dotenv');
config();

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`listening to server on port ${port}`));
