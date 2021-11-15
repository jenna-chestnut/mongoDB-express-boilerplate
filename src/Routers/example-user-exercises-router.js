const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");

const UserExercise = require("../models/example-user-exercise.model");

const userExercisesRouter = express.Router();

userExercisesRouter
  .use(requireAuth)

userExercisesRouter
  .route('/')
  .get(async (req, res, next) => {
    const { _id } = req.user;

    try {
      const userExercises = await UserExercise.find({user_id : _id}).populate('exercise').lean();

      if (!userExercises) return res.status(404).json({
        error: 'user exercises not found'
      });

      else {
        return res.status(200).json({ userExercises });
      }
    }
    catch(error) { next(error); };
  });

module.exports = userExercisesRouter;

