require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/example-user.model');

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const userData = [
  {
    _id: '6046847eb930aeb69876d000',
    user_name: 'User1',
    full_name: 'Test User',
    password: '$2a$04$JXMVL1PAaJlaHv7apR23Yesmsoj5wyH3FjRUR6BFzg7F4Eq3ocgc.',
    is_admin: true
  }
];

User.remove({}, function(err, removed) {
  if (err) {
    console.log('Database Error: ', err);
  }

  User.create(userData, function(err, users) {
    if (err) {
      console.log('Database Error: ', err);
    }

    console.log('Users inserted: ', users);
    process.exit();
  });
});