const mongoose = require('mongoose');

const userExerciseSchema = new mongoose.Schema({
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  frequency: { type: Number, required: true },
  duration: { type: String, default: 'As prescribed' },
  add_note: { type: String, default: 'Give us a call if you have any questions!' },
  date_created: { type: Date, default: Date.now() }
});

const UserExercise = mongoose.model('UserExercise', userExerciseSchema);

module.exports = UserExercise;