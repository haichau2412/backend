const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  productID: [{
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'Product'
  }],
  quantity: {
    type: Number
  },
  totalPrice: Number
},
  {
    collection: 'Order'
  });

const model = mongoose.model('Order', OrderSchema);

module.exports = model;