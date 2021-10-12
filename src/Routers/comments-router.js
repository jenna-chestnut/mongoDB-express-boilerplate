const express = require("express");
const xss = require("xss");
const { requireAuth } = require("../middleware/jwt-auth");

const UserExercise = require("../models/user-exercise.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");

const commentsRouter = express.Router();

commentsRouter
  .use(requireAuth);

const checkUserEx = async (req, res, next) => {
  const { is_admin, is_provider, _id } = req.user;
  const { user_ex_id } = req.params;

  if (user_ex_id.length !== 12 && user_ex_id.length !==24) 
      return res.status(404).json({ error: 'Exercise not found' });

  try {
    const ex = await UserExercise.findOne({_id: user_ex_id}).lean();

    if (!ex) return res.status(404).json({
      error: 'Exercise not found'
    });
    else if ( !is_admin && !is_provider && !(ex.user_id == _id)) 
      return res.status(401).json({
        error: 'Unauthorized request'
      });

    req.userEx = ex;
    next();
  }
  catch(error) { next(error); }
};

commentsRouter
  .route('/:user_ex_id')
  .get(checkUserEx, async (req, res, next) => {
    const { _id } = req.userEx;

    try {
      const comments = await Comment.find({user_exercise: _id}).populate('user', 'full_name').lean();

      const cleanComments = await comments.map(el => {
        return {...el, comment_text: xss(el.comment_text)};
      });

      return res.status(200).json(cleanComments);
    }
    catch (error) { next(error); }
  })
  .post(checkUserEx, async (req, res, next) => {
    const { _id } = req.userEx;
    const { comment_text } = req.body;
    const newComment = { user_exercise: _id, user_id: req.user._id, comment_text };

    for (const [key, value] of Object.entries(newComment)) {
      if (value == null ) {
        return res.status(400).json({
          error: `Must have ${key} field in request body`
        });
      }
    }

    try {
      const newC = await Comment.insertMany(newComment).then(([c]) => c);

      if (!newC) return res.status(400).json({
        error: 'Comment not created! Please try again.'
      });
      else return res.status(201).json(newC);
    }
    catch(error) { next(error); }
  });

const checkUserComment = async (req, res, next) => {
  const { is_admin, is_provider, _id } = req.user;
  const { comment_id } = req.params;

  if (comment_id.length !== 12 && comment_id.length !==24) 
    return res.status(404).json({ error: 'invalid comment id' });
  
  try {
    const comment = await Comment.findOne({_id: comment_id}).lean();

    if (!comment) return res.status(404).json({
      error: 'Comment not found'
    });

    else if ( !is_admin && !is_provider && !(comment.user_id.equals(_id))) 
      return res.status(401).json({
        error: 'Unauthorized request'
      });
  
    req.comment = comment;
    next();
  }
  catch(error) { next(error); }
};

commentsRouter
  .route('/:comment_id')
  .patch(checkUserComment, async (req, res, next) => {
    const { _id } = req.comment;
    const newData = req.body;

    try {
      const updated = await Comment.updateOne({_id}, (newData));
      
      if (!updated.n) return res.status(404).json({
        error: 'Comment not updated'
      });
      else {
        const newComment = await Comment.findOne({_id}).lean();
        res.status(201).json(newComment);
      } 
    }
    catch (error) { next(error); };
  })
  .delete(checkUserComment, async (req, res, next) => {
    const { _id } = req.comment;

    try {
      const deleted = await Comment.deleteOne({_id});
      if (!deleted) return res.status(400).json({
        error: 'Comment not deleted'
      });

      else return res.status(204).end();
    }
    catch (error) { next(error); };
  });

module.exports = commentsRouter;