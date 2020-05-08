const orderRespository = require('../respository/order.repository');

const userRespository = require('../respository/user.repository');

const productRespository = require('../respository/product.repository');

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

//Check out
// const checkOut = async (req, h) => {
//   const user = await userRespository.findUserById(req.user.id);

//   let cart = user.cart;

//   let totalPrice = 0;

//   for (let i = 0; i < cart.length; i++) {
//     totalPrice += cart[i].productPrice;
//   }


//   await userRespository.updateUser(req.user.id, { cart: [] });

//   return h.response({ order: await orderRespository.createOrder({ userID: req.user.id, cart, totalPrice }) })
// }

const checkOut = (req, h) => {
  const user = await userRespository.findUserById(req.user.id);
  const { cart, address } = req.payload.data;
  await orderRespository.createOrder({ userID: user, cart, address });
  return h.resonse({ msg: 'success' });
}



module.exports =
{
  getOrderList,
  getOrderByUser,
  updateOrder,
  checkOut
}