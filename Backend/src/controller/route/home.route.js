const homeRoute = {
  method: 'GET',
  path: '/',
  handler: (req, h) => {
    return h.response('HELLO');
  }
}

module.exports = homeRoute;