const express = require("express");
const checkRestrictedAccess = require("../middleware/restricted-access");
const { requireAuth } = require("../middleware/jwt-auth");
const xss = require("xss");
const UserExercise = require("../models/user-exercise.model");
const User = require("../models/user.model");

const clientMgmtRouter = express.Router();

clientMgmtRouter
  .use(requireAuth)
  .use(checkRestrictedAccess);

clientMgmtRouter
  .route('/exercises/:client_id')
  .post(async (req, res, next) => {
    const { user_id, frequency,
      duration, add_note, exercise } = req.body;
    const newExercise = { user_id, frequency,
      duration, add_note, exercise };

    for (const [key, value] of Object.entries(newExercise)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
      }
    } 
    
    try {
      const newE = await UserExercise.insertMany(newExercise).then(([e]) => e);

      if (!newE) return res.status(400).json({
        error: 'Exercise not createed! Please try again.'
      });
      else return res.status(201).json(newE);
    }
    catch(error) { next(error); }
  });

clientMgmtRouter
  .route('/exercises/:user_ex_id')
  .get(async (req, res, next) => {
    const { user_ex_id } = req.params;

    try {
      if (user_ex_id.length !== 12 && user_ex_id.length !==24) 
      return res.status(404).json({ error: 'Exercise not found' });

      const ex = await UserExercise.findOne({_id: user_ex_id}).populate('exercise').lean();
      if (!ex) return res.status(404).json({
        error: 'Exercise not found'
      });
      else return res.status(200).json({...ex, imgurl: xss(ex.imgurl), videourl: xss(ex.videourl)});
    }
    catch(err) { next(err); }
  })
  .patch(async (req, res, next) => {
    const { user_ex_id } = req.params;

    if (user_ex_id.length !== 12 && user_ex_id.length !==24) 
    return res.status(404).json({ error: 'Exercise not found' });

    const {add_note, frequency, duration} = req.body;
    const newData = {};
    if (add_note) newData['add_note'] = add_note;
    if (frequency) newData['frequency'] = frequency;
    if (duration) newData['duration'] = duration;
 

    try {
      const updated = await UserExercise.updateMany({_id: user_ex_id}, (newData)).lean();
      
      if (!updated) return res.status(404).json({
        error: 'Exercise not found'
      });
      else return res.status(201).json(updated);
    }
    catch (error) { next(error); };
  })
  .delete(checkRestrictedAccess, async (req, res, next) => {
    const { user_ex_id } = req.params;

    try {
      if (user_ex_id.length !== 12 && user_ex_id.length !==24) 
      return res.status(404).json({ error: 'Exercise not found' });

      const ex = await UserExercise.findOne({_id: user_ex_id}).lean();
      if (!ex) return res.status(404).json({
        error: 'Exercise not found'
      });

      const deleted = await UserExercise.deleteOne({_id: ex._id});
      if (!deleted.n) return res.status(400).json({
        error: 'Exercise not deleted'
      });

      else return res.status(204).end();
    }
    catch (error) { next(error); };
  });

  const checkUser = (req, res, next) => {
    const { user_id } = req.params;

    if (user_id.length !== 12 && user_id.length !==24) 
    return res.status(404).json({ error: ' User not found' });

    next();
  }

  clientMgmtRouter
  .route('/goal/:user_id')
  .post(checkUser, async (req, res, next) => {
    const { goal } = req.body;
    const { user_id } = req.params;
    const goalData = {goal};

    try {
      const updated = await User.updateMany({_id: user_id}, (goalData)).lean();
      
      if (!updated) return res.status(404).json({
        error: 'Goal not added'
      });
      else return res.status(201).json(updated);
    }
    catch (error) { next(error); };
  })
  .patch(checkUser, async (req, res, next) => {
    const {user_goal} = req.body;
    const { user_id } = req.params;
    const goalData = {user_goal};
 
      try {
        const updated = await User.updateMany({_id: user_id}, (goalData)).lean();
        
        if (!updated.n) return res.status(404).json({
          error: 'Goal not updated'
        });
        else {
          const newGoal = await User.find({_id: user_id}).distinct('user_goal').then(([g]) => g)

          return res.status(201).json(newGoal);
        }
    }
    catch (error) { next(error); };
  })

module.exports = clientMgmtRouter;