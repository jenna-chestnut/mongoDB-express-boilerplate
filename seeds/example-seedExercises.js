require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('../src/models/example-exercise.model');

// connect to database
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

// create data to seed as an array of objects
const exerciseData = [
  {
    _id: '604158dc5c22d4d6406cc692',
    exercise_name: 'Back Extension', 
  },
  {
    _id: '604158dc5c22d4d6406cc693',
    exercise_name: 'Cervical Spine Retraction/Extension', 
  }
];


Exercise.deleteMany({}, function(err, removed) { // <== clear model
  if (err) {
    console.log('Database Error: ', err);
  }

  Exercise.create(exerciseData, function(err, exercises) { // <== insert new data
    if (err) {
      console.log('Database Error: ', err);
    }

    console.log('Exercises inserted: ', exercises);
    process.exit();
  });
});