const express = require("express");

const Exercise = require('../models/example-exercise.model');

const exercisesRouter = express.Router();

exercisesRouter
  .route('/')
  .get(async (req, res, next) => {
    
    try {
    let exercises = await Exercise.find().lean() 

    if (!exercises) return res.status(404).json({ error: 'Exercises not found'});
    
    return await res.status(200).json(exercises)
      } catch (err) { next(err) }

  })

  module.exports = exercisesRouter;