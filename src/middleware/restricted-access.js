

function checkRestrictedAccess(req, res, next) {
  const { user } = req;

  // if user is not an admin or provider, 401
  if (!user.is_admin && !user.is_provider) {
    return res.status(401).json({
      error: { 
        message: 'Unauthorized request'
      }
    });
  }

  else next();
}

  
module.exports = checkRestrictedAccess;