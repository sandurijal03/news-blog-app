const { Router } = require('express');

const { ensureauthenticated } = require('../../middlewares/auth-middleware');
const {
  register,
  login,
  verify,
  changePassword,
  forgotPassword,
  resetPassword,
} = require('./auth.controllers');

const {
  validate,
  validationRules,
} = require('../../validations/user-validator');

const {
  validate: passwordValidate,
  validationRules: passwordValidationRules,
} = require('../../validations/change-password-validator');

// const {
//   validate,
//   validationRules,
// } = require('../../validations/user-validator');

// const {
//   validate,
//   validationRules,
// } = require('../../validations/user-validator');

const router = Router();

router.post('/register', validationRules(), validate, async (req, res) => {
  await register(req, res);
});

router.post('/login', async (req, res) => {
  await login(req, res);
});

router.post('/verify', async (req, res) => {
  await verify(req, res);
});

router.post('/forgot-password', async (req, res) => {
  await forgotPassword(req, res);
});

router.post('/reset-password', async (req, res) => {
  await resetPassword(req, res);
});

router.post('/change-password', ensureauthenticated, async (req, res) => {
  await changePassword(req, res);
});

module.exports = router;
