const jwt = require('jsonwebtoken');
const Boom = require('boom');

module.exports = function (req, h, next) {
  //Get token from header
  const token = req.headers.authorization;
  //Check if no token 
  if (!token) {
    return h.response('No token');
  }
  //Verified token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded.user;
    console.log(req.user);
    next();
  }
  catch (err) {
    return h.response({ error: err });
  }
}
