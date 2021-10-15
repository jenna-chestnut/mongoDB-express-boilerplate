require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('../../src/models/exercise.model');
const User = require('../../src/models/user.model');
const UserExercise = require('../../src/models/user-exercise.model');
const bcrypt = require('bcryptjs');
const { makeFixtures } = require('./dbcontent.fixtures');

// create dummy data
const {
  users,
  exercises,
  user_exercises
} = makeFixtures();

// key value pairs to iterate through as we seed our test database
const toSeed = [
  { name: 'Exercises', model: Exercise,  data: exercises },
  { name: 'Users', model: User, data: users.map(el => {
    el.password = bcrypt.hashSync(el.password, 1);
    return el; 
  })
  },
  { name: 'UserExercises', model: UserExercise, data: user_exercises },
];

// function to call which will seed our database
const seedTestTables = (url) => {

  mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

  toSeed.forEach(el => {

    el.model.deleteMany({}, function(err, removed) {
      if (err) {
        console.log('Database Error: ', err);
      }
    
      el.model.create(el.data, function(err, data) {
        if (err) {
          console.log('Database Error: ', err);
        }
    
        console.log(`${el.name} inserted`);
      });
    });
  });
};

module.exports = {
  seedTestTables
};