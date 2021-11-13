require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const exampleExercisesRouter = require('./Routers/example-exercises-router');
const authRouter = require('./middleware/auth-router');
const exampleUserExercisesRouter = require('./Routers/example-user-exercises-router');

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

const app = express(); // set up server
app.use(morgan(morganOption)); // add security & semantic middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/EXAMPLE-exercises', exampleExercisesRouter); // add endpoint router(s) to server
app.use('/api/auth', authRouter);
app.use('/api/EXAMPLE-user-exercises', exampleUserExercisesRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello, MongoDB and Express Boilerplate!');
});

app.use(function errorHandler(error, req, res, next) { // added error handler to prevent sensitive information to leak in production
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
