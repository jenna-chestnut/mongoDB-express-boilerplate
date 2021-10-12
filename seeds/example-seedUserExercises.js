require('dotenv').config();
const mongoose = require('mongoose');
const UserExercise = require('../src/models/user-exercise.model');

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const userExerciseData = [
  {
    _id: '60467d7375d2cd48b1aad720',
    exercise: '604158dc5c22d4d6406cc692', 
    user_id: '604678e5852243bcc80b3558',
    frequency: 3,
    duration: 'day', 
    add_note:'Gradually increase pressure if it feels right!'
  },
  {
    _id: '60467d7375d2cd48b1aad721',
    exercise: '604158dc5c22d4d6406cc693', 
    user_id: '604678e5852243bcc80b3558',
    frequency: 1,
    duration: 'hour',
    add_note: 'Take this one slowly, hold off if it hurts.'
  },
  {
    _id: '60467d7375d2cd48b1aad722',
    exercise: '604158dc5c22d4d6406cc695', 
    user_id: '604678e5852243bcc80b3558',
    frequency: 3,
    duration: 'day', 
    add_note:'Be sure to do before bed'
  },
  {
    _id: '60467d7375d2cd48b1aad723',
    exercise: '604158dc5c22d4d6406cc694', 
    user_id: '604678e5852243bcc80b3559',
    frequency: 1,
    duration: '2 hours',
    add_note: 'Be sure to do before & after runnning'
  },
  {
    _id: '60467d7375d2cd48b1aad724',
    exercise: '604158dc5c22d4d6406cc696', 
    user_id: '604678e5852243bcc80b3559',
    frequency: 2,
    duration: 'day', 
    add_note:'Post swim exercise.'
  },
  {
    _id: '60467d7375d2cd48b1aad725',
    exercise: '604158dc5c22d4d6406cc698', 
    user_id: '604678e5852243bcc80b3559',
    frequency: 1,
    duration: 'hour',
    add_note: '10 reps per day maximum!'
  },
  {
    _id: '60467d7375d2cd48b1aad726',
    exercise: '604158dc5c22d4d6406cc697', 
    user_id: '604678e5852243bcc80b355b',
    frequency: 4,
    duration: 'day', 
    add_note:'Let us know if you have any questions!'
  },
  {
    _id: '60467d7375d2cd48b1aad729',
    exercise: '604158dc5c22d4d6406cc699', 
    user_id: '604678e5852243bcc80b355b',
    frequency: 1,
    duration: '4 hours',
    add_note: 'Very important - set an alarm if you need a reminder!'
  },
  {
    _id: '60467d7375d2cd48b1aad727',
    exercise: '604158dc5c22d4d6406cc69a', 
    user_id: '604678e5852243bcc80b355b',
    frequency: 2,
    duration: 'hour',
    add_note: 'Before softball games'
  },
  {
    _id: '60467d7375d2cd48b1aad728',
    exercise: '604158dc5c22d4d6406cc693', 
    user_id: '604678e5852243bcc80b355b',
    frequency: 1,
    duration: 'hour',
    add_note: 'During work in the office'
  },
  {
    _id: '60467d7375d2cd48b1aad72a',
    exercise: '604158dc5c22d4d6406cc692', 
    user_id: '604678e5852243bcc80b355b',
    frequency: 3,
    duration: 'day', 
    add_note:'Can do sitting or standing version'
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