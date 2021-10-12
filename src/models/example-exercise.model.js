const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  exercise_name: { type: String, required: true },
  imgurl: { type: String, required: true },
  videourl: { type: String, required: true },
  body_categories: { type: Array },
  dateCreated: { type: Date, default: Date.now() }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;