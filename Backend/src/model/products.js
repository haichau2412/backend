const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  category: {
    type: String,
    enum: [
      'Pizza',
      'Baverage',
      'Drink'
    ]
  },
  description: {
    type: String,
    maxlength: [500]
  },
  price: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg'
  }
},
  {
    collection: 'Product'
  });

const model = mongoose.model('Product', ProductSchema);

module.exports = model;