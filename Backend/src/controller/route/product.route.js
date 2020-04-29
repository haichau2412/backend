const { getProductList,
  getProductByCategory
} = require('../product.controller');


const productRoute = [
  {
    method: 'GET',
    path: '/products',
    handler: getProductList
  },
  {
    method: 'GET',
    path: '/products/{category}',
    handler: getProductByCategory
  }
]

module.exports = productRoute;
