const {
  getOrderList,
  getOrderByUser,
  updateOrder,
  checkOut
} = require('../order.controller');

const auth = require('../middleware/auth');


const orderRoute = [
  {
    method: 'GET',
    path: '/orders',
    handler: getOrderByUser
  },

  {
    method: 'PUT',
    path: '/orders/{id}',
    handler: updateOrder
  },
  {
    method: 'POST',
    path: '/orders',
    config: {
      pre: [auth],
      handler: checkOut
    }
  }
]

module.exports = orderRoute;
