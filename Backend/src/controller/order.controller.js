const orderRespository = require('../respository/order.respository');

//get product list
//@route GET /products
const getOrderList = async (req, h) => {
  return await orderRespository.list();
}

const getOrderByUser = async (req, h) => {
  const { userid } = req.params;
  return await orderRespository.getOrderByUser(userid);
}

module.exports =
{
  getProductList,
  getProductByCategory
}