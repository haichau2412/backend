const {
  getAllUser,
  getUserInfo,
  signUp,
  logIn,
  updateUserController,
  deleteUserController
} = require('../user.controller');

const UserRoute = [
  {
    method: 'POST',
    path: '/registration',
    handler: signUp
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
      handler: logIn
    }
  }
]

module.exports = UserRoute;

