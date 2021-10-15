require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('../../src/models/example-exercise.model');
const makeExercisesArray = require('./dbcontent.fixtures');

// create dummy data
const exercisesArray = makeExercisesArray();

// function to call which will seed our database
const seedTestTables = (url) => {

  mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

  Exercise.deleteMany({}, function(err, removed) {
    if (err) {
      console.log('Database Error: ', err);
    }
    
    Exercise.create(exercisesArray, function(err, data) {
      if (err) {
        console.log('Database Error: ', err);
      }
    
      console.log('Exercises inserted');
    });
  });
};


module.exports = seedTestTables;