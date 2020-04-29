const userRoute = require('./user.route');
const productRoute = require('./product.route');

const routes = [
  ...userRoute,
  ...productRoute
];

module.exports = routes;