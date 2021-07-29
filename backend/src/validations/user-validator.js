const { check, validationResult } = require('express-validator');

const validationRules = () => {
  return [
    check('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter valid email'),
    check('name')
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage('Name must be between 1 and 20 character.'),
    check('password')
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage('Password must be between 1 and 20 character.'),
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
