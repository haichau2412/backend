const orderRespository = require('../respository/order.respository');

const User = require('../model/users');

const Product = require('../model/products');

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
  const user = await User.findById(req.user.id);

  let cart = user.cart;

  let productIDs = [];

  let quantity = {};

  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    productIDs.push(cart[i].productID);
    quantity[cart[i].productID] = cart[i].quantity;
  }

  const products = await Product.find({ _id: { $in: productIDs } });

  for (let i = 0; i < products.length; i++) {
    totalPrice += products[i].price * quantity[products[i]._id];
  }

  await User.findByIdAndUpdate(req.user.id, { cart: [] }, { new: true });

  return h.response({ Order: await orderRespository.createOrder({ cart, totalPrice }) })
}

module.exports =
{
  getOrderList,
  getOrderByUser,
  updateOrder,
  checkOut
}