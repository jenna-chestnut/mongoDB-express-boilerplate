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
    imgurl: 'https://tinyurl.com/y4qwu5kf', 
    videourl: '3UTHsuDl4vw'
  },
  {
    _id: '604158dc5c22d4d6406cc693',
    exercise_name: 'Cervical Spine Retraction/Extension', 
    imgurl: 'https://tinyurl.com/fzvrcbap', 
    videourl: 'ZY3s2Y1dTck'
  }
];


Exercise.remove({}, function(err, removed) { // <== clear model
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