require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('../src/models/example-exercise.model');

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

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
  },
  {
    _id: '604158dc5c22d4d6406cc695',
    exercise_name: 'Hip Extension', 
    imgurl: 'https://tinyurl.com/k2ncpxjx', 
    videourl: '5ZdkDtwmgWs'
  },
  {
    _id: '604158dc5c22d4d6406cc694',
    exercise_name: 'Thoracic Extension Sitting', 
    imgurl: 'https://tinyurl.com/y4fwrt4l', 
    videourl: 'U-b_36Uc-9E'
  },
  {
    _id: '604158dc5c22d4d6406cc696',
    exercise_name: 'Knee Flexion', 
    imgurl: 'https://tinyurl.com/y2jmtb3e', 
    videourl: 'lMpP4ngZKw4'
  },
  {
    _id: '604158dc5c22d4d6406cc697',
    exercise_name: 'Elbow Extension', 
    imgurl: 'https://tinyurl.com/jzmu8v78', 
    videourl: 'ry8lUjavfr8'
  },
  {
    _id: '604158dc5c22d4d6406cc698',
    exercise_name: 'Inner Thigh Stretch', 
    imgurl: 'https://tinyurl.com/k2ncpxjx', 
    videourl: 'S37HKFbpx4U'
  },
  {
    _id: '604158dc5c22d4d6406cc699',
    exercise_name: 'Wrist Extension', 
    imgurl: 'https://tinyurl.com/jzmu8v78', 
    videourl: 'dyCAYuT77iQ'
  },
  {
    _id: '604158dc5c22d4d6406cc69a',
    exercise_name: 'Shoulder Internal Rotation', 
    imgurl: 'https://tinyurl.com/y37oj8lz', 
    videourl: 'Ab6jLeQfHvg'
  }
];

Exercise.remove({}, function(err, removed) {
  if (err) {
    console.log('Database Error: ', err);
  }

  Exercise.create(exerciseData, function(err, exercises) {
    if (err) {
      console.log('Database Error: ', err);
    }

    console.log('Exercises inserted: ', exercises);
    process.exit();
  });
});