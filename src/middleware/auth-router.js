/* eslint-disable eqeqeq */
const express = require('express');
const AuthService = require('../middleware/auth-service');
const { requireAuth } = require('../middleware/jwt-auth');

const authRouter = express.Router();

authRouter
  .route('/login')
  .post(async (req, res, next) => {
    const { user_name, password } = req.body;
    const loginUser = {user_name, password};

    for (const [key, value] of Object.entries(loginUser)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
      }
    }
    
    try {
    const user = await AuthService.getUserWithUserName(
      loginUser.user_name
    )

    if (!user) {
      return res.status(400).json({
        error: 'Invalid user_name or password'
      });
    }

    const pw = await AuthService.comparePasswords(
      loginUser.password, user.password
    )

    if (!pw) {
      return res.status(400).json({
        error: 'Invalid user_name or password'
      });
    }

        const sub = user.user_name;
        const payload = { 
          user_id : user._id,  
          name: user.full_name,
          is_admin: user.is_admin 
        };
        return res.send({
          authToken: AuthService.createJwt(sub, payload)
        });
      } catch(err) {next(err)};

    })
  .put(requireAuth, (req, res) => {
    const { user } = req;
    const sub = user.user_name;
    const payload = {
      user_id: user.id,
      name: user.full_name,
      is_admin: user.is_admin
    };
    res.send({
      authToken: AuthService.createJwt(sub, payload),
    });
  });

module.exports = authRouter;
