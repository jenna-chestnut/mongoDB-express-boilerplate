const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');
// const User = require('../models/user.model');

const AuthService = {
  createUser: async (newUser) => {
    newUser.password = bcrypt.hashSync(newUser.password, 1);
    return await User.insertMany(newUser)
      .then(([user]) => user);
  },
  getUserWithUserName: async (user_name) => {
    return await User.find({user_name})
    .then(([user]) => user);
  },
  deleteUser(db, id) {
    return db('users')
      .delete()
      .where({ id });
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':');
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, JWT_SECRET, {
      subject,
      expiresIn: JWT_EXPIRY,
      algorithm: 'HS256'
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256']
    });
  }
};
  
module.exports = AuthService;