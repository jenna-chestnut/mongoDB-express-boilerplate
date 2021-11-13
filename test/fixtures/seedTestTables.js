require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Exercise = require('../../src/models/example-exercise.model');
const User = require('../../src/models/example-user.model');
const UserExercise = require('../../src/models/example-user.model');
const { makeFixtures } = require('./dbcontent.fixtures');

// create dummy data
const {
  exercises,
  users,
  user_exercises
} = makeFixtures();


// we will iterate through this array as we seed each table in our database
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


module.exports = seedTestTables;