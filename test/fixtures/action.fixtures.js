const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../../src/config');

const {
  makeUsersArray,
  makeExercisesArray
} = require('./dbcontent.fixtures');

const ex = makeExercisesArray();
const users = makeUsersArray();

function makeAuthHeader(user, secret = JWT_SECRET) {
  const token = jwt.sign({ 
    user_id: user._id,
    name: user.full_name,
    is_admin: user.is_admin
  }, secret, {
    subject: user.user_name,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

const makeNewExercise = () => {
  return {
    exercise_name: 'New Exercises', 
  };
};

const makeNewUserExercise = () => {
  return {
    exercise: ex[1]._id, 
    user_id: users[3]._id,
    frequency: 1,
    duration: 'day', 
    add_note:'New exercise. Gradually increase pressure if it feels right!'
  };
};

const makeNewUser = () => {
  return {
    _id: '6048e696450d06099c1c3559',
    full_name: 'New User',
    user_name: 'brandNewUser',
    password: 'SOs0s3cr3t!',
    is_admin: false
  };
};

module.exports = {
  makeAuthHeader,
  makeNewExercise,
  makeNewUser,
  makeNewUserExercise
};