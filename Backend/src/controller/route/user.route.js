const {
  getAllUser,
  getUserInfo,
  signUp,
  logIn,
  updateUserController,
  deleteUserController,
  addToCart,
  decreaseProductFromCart,
  deleteCart,
  confirmEmail
} = require('../user.controller');

const { signUpValidations,
  loginValidations,
  deleteValidation } = require('../validation/user.validation');

const auth = require('../middleware/auth');

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
      },
      pre: [auth]
      ,
      validate: loginValidations.all,
      handler: logIn
    }
  },
  {
    method: 'PUT',
    path: '/users/cart',
    config: {
      pre: [auth],
      handler: addToCart
    }
  },
  {
    method: 'PATCH',
    path: '/users/cart',
    config: {
      pre: [auth],
      handler: decreaseProductFromCart
    }
  },
  {
    method: 'DELETE',
    path: '/users/cart',
    config: {
      pre: [auth],
      handler: deleteCart
    }
  },
  {
    method: 'GET',
    path: '/auth/confirm-email/{confirmToken}',
    handler: confirmEmail

  }
]

module.exports = UserRoute;

