const orderRespository = require('../respository/order.respository');

const userRespository = require('../respository/user.respository');

const productRespository = require('../respository/product.respository');

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
const checkOut = async (req, h) => {
  const user = await userRespository.findUserById(req.user.id);

  let cart = user.cart;

  let productIDs = [];

  let quantity = {};

  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    productIDs.push(cart[i].productID);
    quantity[cart[i].productID] = cart[i].quantity;
  }

  const products = await productRespository.findAllProductInArray(productIDs);

  for (let i = 0; i < products.length; i++) {
    totalPrice += products[i].price * quantity[products[i]._id];
  }

  await userRespository.updateUser(req.user.id, { cart: [] });

  return h.response({ order: await orderRespository.createOrder({ userID: req.user.id, cart, totalPrice }) })
}

module.exports =
{
  getOrderList,
  getOrderByUser,
  updateOrder,
  checkOut
}