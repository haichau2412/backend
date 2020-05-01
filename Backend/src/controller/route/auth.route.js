const auth = require('../middleware/auth');

const authRoute =
{
  method: 'GET',
  path: '/auth',
  config: {
    pre: [auth],
    handler: (req, h) => {
      return h.response('Auth route');
    }
  }


}

module.exports = authRoute;