const model = require('../model/orders');


const createOrder = async (order) => {
  return await model.create(order);
}

const list = () => {
  return model.find().sort(1);
}

const findOrderById = async (id) => { return await model.findById(id); }

const findOrderByUserID = async (id) => { return await model.find({ userID: id }); }

const findOrderByProductID = async (id) => { return await model.find({ productID: id }); }


const deleteOrder = (id) => { return model.findByIdAndDelete(id); }

const updateOrder = (id, newOrder) => {
  return model.findByIdAndUpdate(id, newOrder, { new: true, runValidators: true });
}

module.exports = {
  createOrder,
  list,
  findOrderById,
  findOrderByUserID,
  deleteOrder,
  updateOrder,
  findOrderByProductID
}

