const mongoose = require('mongoose');

//create schema
const userExerciseSchema = new mongoose.Schema({
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }, 
  // ^^ type/ref will make it so you can populate the data from another model ie: Exercise
  user_id: { type: String, required: true },
  frequency: { type: Number, required: true },
  duration: { type: String, default: 'As prescribed' },
  add_note: { type: String, default: 'Give us a call if you have any questions!' },
  date_created: { type: Date, default: Date.now() }
});

//assign schema to model
const UserExercise = mongoose.model('UserExercise', userExerciseSchema);

module.exports = UserExercise;