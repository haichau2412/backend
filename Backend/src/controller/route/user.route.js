const {
  getAllUser,
  getUserInfo,
  signUp,
  logIn,
  updateUserController,
  deleteUserController
} = require('../user.controller');

const { signUpValidations,
  loginValidations,
  deleteValidation } = require('../validation/user.validation');

const UserRoute = [
  {
    method: 'POST',
    path: '/registration',

    options: {
      state: {
        parse: true,
        failAction: 'error'
      }
      ,
      validate: signUpValidations.all,
      handler: signUp
    }
  },
  {
    method: 'GET',
    path: '/users',
    handler: getAllUser
  },
  {
    method: 'POST',
    path: '/login',

    options: {
      state: {
        parse: true,
        failAction: 'error'
      }
      ,
      validate: loginValidations.all,
      handler: logIn
    }
  }
]

module.exports = UserRoute;

