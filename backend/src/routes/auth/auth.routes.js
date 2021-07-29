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
  /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/RegisterModel" }
    } */

  await register(req, res);
});

router.post('/login', async (req, res) => {
  /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/LoginModel" }
    } */
  await login(req, res);
});

router.post('/verify', async (req, res) => {
  /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/VerifyEmailModel" }
    } */
  await verify(req, res);
});

router.post('/forgot-password', async (req, res) => {
  /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ForgotPassWordModel" }
    } */
  await forgotPassword(req, res);
});

router.post('/reset-password', async (req, res) => {
  /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ResetPasswordModel" }
    } */
  await resetPassword(req, res);
});

router.post('/change-password', ensureauthenticated, async (req, res) => {
  /*  #swagger.tags = ['Auth']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ChangePasswordModel" }
    } */

  await changePassword(req, res);
});

module.exports = router;
