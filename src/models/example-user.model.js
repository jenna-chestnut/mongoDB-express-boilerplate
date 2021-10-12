const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true, unique: true },
  full_name: { type: String, required: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, default: false },
  is_provider: { type: Boolean, default: false },
  user_goal: { type: String },
  date_created: { type: Date, default: Date.now() }
});

const User = mongoose.model('User', userSchema);

module.exports = User;