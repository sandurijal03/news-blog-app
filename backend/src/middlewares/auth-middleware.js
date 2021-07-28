const passport = require('passport');

const ensureauthenticated = passport.authenticate('jwt', {
  session: false,
});

const ensureauthorized = (roles) => (req, res, next) => {
  if (roles.includes(req.user.roles)) {
    return next();
  }
  return res.status(401).json({
    message: 'Unauthorized',
    success: false,
  });
};

module.exports = {
  ensureauthenticated,
  ensureauthorized,
};
