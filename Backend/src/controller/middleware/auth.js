const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.headers['x-auth-token'];
  console.log(req.headers);
  //Check if no token 
  if (!token) {
    return 'No token, authorization denied';
  }
  //Verified token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded.user;
    next();
  }
  catch (err) {
    return 'Token is not valid';
  }
}