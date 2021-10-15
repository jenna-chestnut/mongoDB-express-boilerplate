const mongoose = require('mongoose');

// create schema
const exerciseSchema = new mongoose.Schema({
  exercise_name: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() }
});

// assign schema to model
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;