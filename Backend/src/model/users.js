const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Please add a username'],
    unique: true
  },
  password: {
    type: String,
    require: [true, 'Please add password'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  email: {
    type: String,
    require: [true, 'Please add an email'],
    unique: true
  },
  fullname: {
    type: String
  },
  cart: [
    {
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
    }
  ]

},
  {
    collection: 'User'
  });

//Encrypt password
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  const payload = {
    user: {
      id: this.id
    }
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {

  return await bcrypt.compare(enteredPassword, this.password);
}

const model = mongoose.model('User', UserSchema);

module.exports = model;