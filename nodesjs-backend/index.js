// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const login = require('./controllers/login');
const forums = require('./controllers/forums');
const signup = require('./controllers/signup');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(login);
app.use(forums);
app.use(signup);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
