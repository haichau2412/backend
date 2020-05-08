const orderRespository = require('../respository/order.repository');

const userRespository = require('../respository/user.repository');

const productRespository = require('../respository/product.repository');

//get product list
//@route GET /products
const getOrderList = async (req, h) => {
  return await orderRespository.list();
}

const getOrderByUser = async (req, h) => {
  if (!req.user) {
    return h.response({ msg: 'Please login' });
  }
  const { id } = req.user;
  return await orderRespository.getOrderByUser(id);
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

const checkOut = async (req, h) => {
  if (!req.user) {
    return h.response({ msg: 'Please login before check out' });
  }
  console.log(req.headers);
  const user = await userRespository.findUserById(req.user.id);
  const { cart, address, totalPrice } = req.payload;
  await orderRespository.createOrder({ userID: user, cart, address, totalPrice });
  return h.response({ msg: 'Order successfully' });
}



module.exports =
{
  getOrderList,
  getOrderByUser,
  updateOrder,
  checkOut
}