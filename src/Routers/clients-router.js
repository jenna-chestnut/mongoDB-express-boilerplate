const express = require("express");
const checkRestrictedAccess = require("../middleware/restricted-access");
const { requireAuth } = require("../middleware/jwt-auth");
const xss = require("xss");

const Exercise = require('../models/exercise.model');
const UserExercise = require("../models/user-exercise.model");
const User = require("../models/user.model");

const clientsRouter = express.Router();

clientsRouter
  .use(requireAuth)
  .use(checkRestrictedAccess);

clientsRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const clients = await User.find({ 
        is_admin: false, is_provider: false 
      }).lean();

      let clientsToSend = clients.map(el => {
        const { password, ...rest } = el;
        return rest;
      });

      if (!clients) return res.status(404).json({error: 'clients not found'});
      else return res.status(200).json(clientsToSend);
    }
    catch(error) { next(error); };
  });

clientsRouter
  .route('/:client_id')
  .get(async (req, res, next) => {
    const { client_id } = req.params;

    try {
      const client = await User.findOne({ _id: client_id }).lean();
      const clientExercises = await UserExercise.find({user_id : client_id}).populate('exercise').lean();

      if (!client) return res.status(404).json({
        error: 'client not found'
      });
      else if (!clientExercises) return res.status(404).json({
        error: 'client exercises not found'
      });

      else {
        const { password, ...rest } = client;
        return res.status(200).json({ client : rest, clientExercises });
      }
    }
    catch(error) { next(error); };
  });

module.exports = clientsRouter;