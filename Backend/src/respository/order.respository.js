const model = require('../model/orders');


const createOrder = async (order) => {
  return await model.create(order);
}

const list = () => {
  return model.find();
}

const findOrderById = async (id) => { return await model.findById(id); }

const findOrderByUserID = async (id) => { return await model.find({ userID: id }); }

const findOrderByProductID = async (id) => { return await model.find({ productID: id }); }


const deleteOrder = async (id) => { return await model.findByIdAndDelete(id); }

const updateOrder = async (id, newOrder) => {
  return await model.findByIdAndUpdate(id, newOrder, { new: true, runValidators: true });
}

const updateProductInOrder = async (id, product) => {
  const order = await findOrderById(id);
  await model.productID.unshift(product);
  return model.save();
}

module.exports = {
  createOrder,
  list,
  findOrderById,
  findOrderByUserID,
  deleteOrder,
  updateOrder,
  findOrderByProductID,
  updateProductInOrder
}

