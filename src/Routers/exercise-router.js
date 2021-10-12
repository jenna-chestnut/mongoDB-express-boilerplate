const express = require("express");
const checkRestrictedAccess = require("../middleware/restricted-access");
const { requireAuth } = require("../middleware/jwt-auth");
const xss = require("xss");

const Exercise = require('../models/exercise.model');
const UserExercise = require("../models/user-exercise.model");
const User = require("../models/user.model");

const exercisesRouter = express.Router();

exercisesRouter
  .use(requireAuth);

exercisesRouter
  .route('/')
  .get(async (req, res, next) => {
    const { is_admin, is_provider, _id } = req.user;
    
    try {
    let exercises = is_admin || is_provider 
    ? await Exercise.find().lean() 
    : await UserExercise.find({user_id : _id}).populate('exercise').lean();

    console.log(exercises)

    if (!exercises) return res.status(404).json({ error: 'Exercise not found'});

    if (!is_admin && !is_provider) {
      const goal = await User.find({_id}).distinct('user_goal').then(([g]) => g);
      exercises = exercises.map(el => {
        const {imgurl, videourl, exercise_name} = el.exercise;
        return {...el, exercise_name, imgurl, videourl}
      })
      exercises = await { goal, exercises };
    }
    
    return await res.status(200).json(exercises)
      } catch (err) { next(err) }

  })
  .post(checkRestrictedAccess, async (req, res, next) => {
    const { exercise_name, imgurl, videourl } = req.body;
    const newExercise = { exercise_name, imgurl, videourl };

    for (const [key, value] of Object.entries(newExercise)) {
      if (value == null ) {
        return res.status(400).json({
          error: `Must have ${key} field in request body`
        });
      }
    }

    try {
      const newE = await Exercise.insertMany(newExercise).then(([e]) => e);

      if (!newE) return res.status(400).json({
        error: 'Exercise not created! Please try again.'
      });
      else return res.status(201).json(newE);
    }
    catch(error) { next(error); }
  });

const checkExId = (req, res, next) => {
  const { ex_id } = req.params;
  if (ex_id.length !== 12 && ex_id.length !==24) 
    return res.status(404).json({ error: 'Exercise not found' });
  next();
}

exercisesRouter
  .route('/:ex_id')
  .get(checkExId, async (req, res, next) => {

    const { is_admin, is_provider, _id } = req.user;
    const { ex_id } = req.params;

    try {
      let exercise = is_admin || is_provider 
      ? await Exercise.findOne({_id: ex_id}).lean() 
      : await UserExercise.findOne({user_id : _id, exercise: ex_id}).populate('exercise').lean();

      if (!exercise) return res.status(404).json({error: 'Exercise not found'});

      if (!is_admin && !is_provider) {
        const {exercise_name, imgurl, videourl} = exercise.exercise;
        exercise = {...exercise, exercise_name, imgurl, videourl}
      }

      return res.status(200).json({...exercise, imgurl: xss(exercise.imgurl), videourl: xss(exercise.videourl)});
    }
    catch (error) { next(error); }
  })
  .patch(checkRestrictedAccess, checkExId, async (req, res, next) => {
    const { ex_id } = req.params;
    const newData = req.body;

    try {
      const updated = await Exercise.updateOne({_id: ex_id}, (newData));
      
      if (!updated.n) return res.status(404).json({
        error: 'Exercise not found'
      });
      else {
        const updatedEx = await Exercise.findOne({_id: ex_id}).lean();
        return res.status(201).json(updatedEx);
      }
    }
    catch (error) { next(error); };
  })
  .delete(checkRestrictedAccess, checkExId, async (req, res, next) => {
    const { ex_id } = req.params;

    try {
      const ex = await Exercise.findOne({_id: ex_id}).lean();
      if (!ex) return res.status(404).json({
        error: 'Exercise not found'
      });

      const deleted = await Exercise.deleteOne({_id: ex._id});
      if (!deleted) return res.status(400).json({
        error: 'Exercise not deleted'
      });

      else return res.status(204).end();
    }
    catch (error) { next(error); };
  });

module.exports = exercisesRouter;