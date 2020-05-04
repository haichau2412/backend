const productRespository = require('../respository/product.repository');
const fs = require('fs');


//get product list
//@route GET /products
const getProductList = async (req, h) => {
  return h.response(await productRespository.list());
}

const getProductByCategory = async (req, h) => {
  const { category } = req.params;
  return h.response({ category: await productRespository.getProductByCategory(category) });
}

const createProduct = async (req, h) => {
  return h.response({ product: await productRespository.createProduct(req.payload) });
}

module.exports =
{
  getProductList,
  getProductByCategory,
  createProduct
}