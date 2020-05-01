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

const updateOrder = async (req, h) => {
  const { id } = req.params;
  const newProduct = req.payload;

  try {
    await orderRespository.updateProductInOrder(id, newProduct);

    return await orderRespository.findOrderById(id);
  }
  catch (err) {
    return h.response({ error: err });
  }
}

module.exports =
{
  getOrderList,
  getOrderByUser,
  updateOrder
}