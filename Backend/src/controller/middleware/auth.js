const jwt = require('jsonwebtoken');

module.exports = function (req, h, next) {
  //Get token from header
  const token = req.headers['x-auth-token'];
  //Check if no token 
  if (!token) {
    return h.response({ msg: 'No token, authorization denied' });
  }
  //Verified token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded.user;
    console.log(decoded.user);
    next();
  }
  catch (err) {
    return h.response({ error: err });
  }
}
