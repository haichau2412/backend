const {
  getOrderList,
  getOrderByUser,
  updateOrder
} = require('../order.controller');


const orderRoute = [
  {
    method: 'GET',
    path: '/orders',
    handler: getOrderList
  },
  {
    method: 'PUT',
    path: '/orders/{id}',
    handler: updateOrder
  }
]

module.exports = orderRoute;
