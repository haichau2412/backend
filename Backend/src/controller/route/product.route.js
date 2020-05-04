const { getProductList,
  getProductByCategory,
  createProduct
} = require('../product.controller');

const {
  createProductValidations,
  deleteValidation
} = require('../validation/product.validation');


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
  },
  {
    method: 'POST',
    path: '/products/add',
    config: {
      validate: createProductValidations.all,
      handler: createProduct
    }
  }
]

module.exports = productRoute;
