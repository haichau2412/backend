const auth = require('../middleware/auth');
const { authentication } = require('../user.controller')

const authRoute =
{
  method: 'GET',
  path: '/auth',
  config: {
    pre: [auth],
    handler: authentication
  }


}

module.exports = authRoute;