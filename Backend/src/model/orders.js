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
  cart: [{
    productID: {
      type: String,
      require: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    productPrice: {
      type: Number
    }
  }]
},
  {
    collection: 'Order'
  });

const model = mongoose.model('Order', OrderSchema);

module.exports = model;