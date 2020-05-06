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
  size: {
    type: String,
    enum: [
      'S',
      'M',
      'L'
    ],
    default: 'S'
  }
},
  {
    collection: 'Product'
  });

const model = mongoose.model('Product', ProductSchema);

module.exports = model;