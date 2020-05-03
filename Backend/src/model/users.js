const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
  isActive: {
    type: Boolean,
    default: false
  },
  checkToken: {
    type: String
  },
  confirmEmailExpire: {
    type: Date
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
      },
      size: {
        type: String,
        enum: [
          'S',
          'M',
          'L'
        ]
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
  console.log(await bcrypt.compare(enteredPassword, this.password));
  return await bcrypt.compare(enteredPassword, this.password);
}

// Generate and hash confirm Email token
UserSchema.methods.getConfirmEmailToken = function () {
  // Generate token
  const confirmToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken
  this.checkToken = crypto
    .createHash("sha256")
    .update(confirmToken)
    .digest("hex");

  // Set expire
  this.confirmEmailExpire = Date.now() + 10 * 60 * 10000;
  return confirmToken;
};

const model = mongoose.model('User', UserSchema);

module.exports = model;