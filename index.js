const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./src/routes/userRoutes');
const enviroment = require('./src/environment/environment');

const app = express();
const port = enviroment.port.SERVER_PORT;

app.use(bodyParser.json());
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the users App');
});

app.listen(port);

module.exports = app;
