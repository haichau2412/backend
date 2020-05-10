const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  address: {
    type: String
  },
  cart: [{
    product: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1
    }
  }]
},
  {
    collection: 'Order'
  });

const model = mongoose.model('Order', OrderSchema);

module.exports = model;