require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const authRouter = require('./middleware/auth-router');
const registerRouter = require('./Routers/registration-router');
const exercisesRouter = require('./Routers/exercise-router');
const clientsRouter = require('./Routers/clients-router');
const adminRouter = require('./Routers/admin-router');
const clientMgmtRouter = require('./Routers/client-mgmt-router');
const commentsRouter = require('./Routers/comments-router');

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

const app = express();
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/auth', registerRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', adminRouter);
app.use('/api/client-mgmt', clientMgmtRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello, MoveMed! To use, check out the docs for this API in the MoveMed MongoDB API repo for jenna-chestnut at GitHub.');
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error('error');
    response = { message: error.message, error };
  }
  console.log(response);
  res.status(500).json(response);
});

module.exports = app;
