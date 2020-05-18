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
  phone: {
    type: String
  },
  cart: [{
    productID: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: 'Product'
    },
    name: {
      type: String,
      require: true
    },
    category: {
      type: String,
      enum: [
        'Pizza',
        'Dessert',
        'Drink'
      ]
    },
    description: {
      type: String,
      maxlength: [500]
    },
    price: {
      type: Number,
      require: true
    },
    photo: {
      type: String,
      default: 'no-photo.jpg'
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  createAt: {
    type: Date,
    default: Date.now
  }
},
  {
    collection: 'Order'
  });

const model = mongoose.model('Order', OrderSchema);

module.exports = model;