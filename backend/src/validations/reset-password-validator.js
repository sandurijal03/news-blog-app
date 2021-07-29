const { check, validationResult } = require('express-validator');

const validationRules = () => {
  return [
    check('oldPassword')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Old Password must be between 6 and 20 character'),
    check('newPassword')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('New Password must be between 6 and 20 character'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const resultErrors = [];

  errors.array().map((err) => resultErrors.push({ [err.param]: err.msg }));
  resultErrors.push({ message: 'action unsuccessful' });
  resultErrors.push({ success: false });

  const errorObject = Object.assign({}, ...resultErrors);
  return res.status(422).json(errorObject);
};

module.exports = {
  validationRules,
  validate,
};
