require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/example-user.model');

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const userData = [
  {
    _id: '6046847eb930aeb69876d000',
    user_name: 'Jennabot5000',
    full_name: 'Jenna Chestnut',
    password: '$2a$04$JXMVL1PAaJlaHv7apR23Yesmsoj5wyH3FjRUR6BFzg7F4Eq3ocgc.',
    is_admin: true,
    is_provider: true
  },
  {
    _id: '604678e5852243bcc80b3558',
    user_name: 'SalemtheDog',
    full_name: 'Salem Chestnut',
    password: '$2a$04$Wi4F0gsLW10vGRdZNbUVL.YIiNxZGJvNclpozolW/8xdR9Wsp.YFW',
    is_admin: false,
    is_provider: false,
    user_goal: 'Get back into your swim team without achy knees!'
  },
  {
    _id: '604678e5852243bcc80b3559',
    user_name: 'Odykins',
    full_name: 'Otis Jackson',
    password: '$2a$04$GRXA/pyDfSuXUdiSZ9rQduL/Q7DAsEB2OpWb1xUgfVGFfTEfv4Wqu',
    is_admin: false,
    is_provider: false,
    user_goal: 'Fix your posture so you can sit and stand taller & without pain'
  },
  {
    _id: '604678e5852243bcc80b355a',
    user_name: 'TheFizzicyst',
    full_name: 'Doctor Thunder',
    password: '$2a$04$jILw8c06cs4VmFAVPLcCp.xn8Cki7gTKJtvbkE/EeqVOx2vPXhz0e',
    is_admin: false,
    is_provider: true
  },
  {
    _id: '604678e5852243bcc80b355b',
    user_name: 'nSpireMe',
    full_name: 'Anita Inspo',
    password: '$2a$04$3qRBLtY7BxjIJiKaIzufDOANSz6mqcDwnYW4XfdDk6PKK7v2ZEERG',
    is_admin: false,
    is_provider: false,
    user_goal: 'Feel more comfortable overall, without being afraid of falling or getting injured.'
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