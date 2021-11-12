const AuthService = require('./auth-service');

async function requireAuth(req, res, next) {
  const authToken = req.get('authorization') || '';

  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error : 'Missing bearer token' });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken); 
    try { 
      const user = await AuthService.getUserWithUserName(payload.sub);
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized request' });
      }
      req.user = user;
      next();
    } catch(err) {
      console.error(err);
      next(err);
    }

  } catch(error) {
    return res.status(401).json({error: 'Unauthorized request'});
  }
}

function checkUserInfo(req, res, next) {
  const authToken = req.get('authorization') || '';

  let bearerToken = authToken.slice(7, authToken.length);

  if (!bearerToken) next();
  
  else { 
    const payload = AuthService.verifyJwt(bearerToken);

    AuthService.getUserWithUserName(payload.sub)
      .then(user => {
        req.user = user;
        next();
      }).catch(err => {
        console.error(err);
        next(err);
      });
  }
}
  
module.exports = {
  requireAuth,
  checkUserInfo
};