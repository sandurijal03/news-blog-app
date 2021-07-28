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

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/verify', verify);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

router.post('/change-password', ensureauthenticated, changePassword);

module.exports = router;
