const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./src/routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the users App');
});
 module.exports = app ;
