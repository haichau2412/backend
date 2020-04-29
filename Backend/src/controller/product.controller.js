const productRespository = require('../respository/product.respository');

//get product list
//@route GET /products
const getProductList = async (req, h) => {
  return await productRespository.list();
}

const getProductByCategory = async (req, h) => {
  const { category } = req.params;
  return await productRespository.getProductByCategory(category);
}

module.exports =
{
  getProductList,
  getProductByCategory
}