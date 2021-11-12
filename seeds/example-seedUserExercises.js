require('dotenv').config();
const mongoose = require('mongoose');
const UserExercise = require('../src/models/example-user-exercise.model');

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const userExerciseData = [
  {
    _id: '60467d7375d2cd48b1aad720',
    exercise: '604158dc5c22d4d6406cc692', 
    user_id: '6046847eb930aeb69876d000',
    frequency: 3,
    duration: 'day', 
    add_note:'Gradually increase pressure if it feels right!'
  }
];

UserExercise.remove({}, function(err, removed) {
  if (err) {
    console.log('Database Error: ', err);
  }

  UserExercise.create(userExerciseData, function(err, exercises) {
    if (err) {
      console.log('Database Error: ', err);
    }

    console.log('Exercises inserted: ', exercises);
    process.exit();
  });
});