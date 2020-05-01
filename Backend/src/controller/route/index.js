const userRoute = require('./user.route');
const productRoute = require('./product.route');
const orderRoute = require('./order.route');
const authRoute = require('./auth.route');


const routes = [
  ...userRoute,
  ...productRoute,
  ...orderRoute,
  authRoute
];

module.exports = routes;