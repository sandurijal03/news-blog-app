const { check, validationResult } = require('express-validator');

const validationRules = () => {
  return [
    check('title')
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage('Title must be between 2 and 20 in minimum'),
    check('videoId')
      .trim()
      .isLength({ min: 11, max: 11 })
      .withMessage('Videoid must be 11 characters long'),
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
