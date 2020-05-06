const userRoute = require('./user.route');
const productRoute = require('./product.route');
const orderRoute = require('./order.route');
const authRoute = require('./auth.route');
const homeRoute = require('./home.route');


const routes = [
  ...userRoute,
  ...productRoute,
  ...orderRoute,
  authRoute,
  homeRoute
];

module.exports = routes;