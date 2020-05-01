const {
  list,
  createUser,
  findUserById,
  findUserByUsername,
  deleteUser,
  updateUser,
  findUserByEmail,

} = require('../respository/user.respository');

const User = require('../model/users');

const Product = require('../model/products');

//get all user
//@route GET /users
const getAllUser = async (req, h) => {
  return h.response({ List: await list() });
}

//sign up
//@route POST /registration
const signUp = async (req, h) => {
  const { username, password, email, confirmedPassword } = req.payload;
  const userFound = await findUserByUsername(username);
  const emailExist = await findUserByEmail(email);

  if (userFound) {
    return h.response({ msg: 'User Already Registered' });
  }
  else {
    if (confirmedPassword !== password) {
      return h.response({ msg: 'Confirm Password and Password must be the same!' });
    }
    if (emailExist) {
      return h.response({ msg: 'Email already existed. Please choose another email' });
    }
  }

  try {
    const newUser = { username, password, email };

    const user = await createUser(newUser);
    return sendTokenResponse(user, h);
  }
  catch (err) {
    console.log(err);
  }



}

//log in 
//@route GET /login
const logIn = async (req, h) => {
  const { username, password } = req.payload;
  const user = await findUserByUsername(username);
  if (!user) {
    return h.response({ msg: 'Not Found' });
  }
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return h.response({ msg: 'Password is not match' });
  }

  return sendTokenResponse(user, h);




}

//View User Info
//@route GET /users/{id}
const getUserInfo = async (req, h) => {
  const userId = req.params.id;

  return h.response({ UserInformation: await findUserById(userId) });
}

const authentication = async (req, h) => {
  const userId = req.user.id;
  try {
    const user = await findUserById(userId);
    return h.response({ User: user });
  }
  catch (err) {
    return h.response({ error: err });
  }

}

//Delete User By Id
//@route DELETE /users/{id}
const deleteUserController = async (req, h) => {
  return h.response({ Delete: await deleteUser(req.params.id) });
}

//Update User 
//@route PUT /users/{id}
const updateUserController = async (req, h) => {
  const newInfo = req.payload;

  return await updateUser(req.params.id, newInfo);
}

//Add product to cart
//@route PUT /users/cart
const addToCart = async function (req, h) {
  try {
    const { productID } = req.payload;
    const newPro = { productID };
    const product = await Product.findById(productID);

    if (!product) {
      return h.response({ msg: 'Product not found' });
    }
    if (!req.user) {
      return h.response({ msg: 'No token' });
    }

    let user = await User.findById(req.user.id);
    console.log(user.cart);
    //Check product exist in cart
    let isFound = false;
    for (let i = 0; i < user.cart.length; i++) {
      console.log(user.cart[i]);
      if (user.cart[i].productID == productID) {

        isFound = true;
        user.cart[i].quantity++;
      }
    }
    if (!isFound) {
      user.cart.unshift(newPro);
    }


    user = await User.findByIdAndUpdate(req.user.id, { cart: user.cart }, { new: true });

    return h.response({ User: user });
  }
  catch (err) {
    return h.response({ error: err });
  }
}

//Decrease item from cart
//@route PATCH /users/cart
const decreaseProductFromCart = async function (req, h) {
  const { productID } = req.payload;
  const newPro = { productID };
  let user = await User.findById(req.user.id);
  console.log(user.cart);
  //Check product exist in cart
  let isFound = false;
  for (let i = 0; i < user.cart.length; i++) {
    if (user.cart[i].productID == productID) {
      isFound = true;
      if (user.cart[i].quantity == 1) {
        user.cart.splice(i, 1);
        i--;
      }
      else {
        user.cart[i].quantity--;
      }

    }
  }
  console.log(isFound);
  if (!isFound) {
    return h.response({ msg: 'Product is not in cart' });
  }


  user = await User.findByIdAndUpdate(req.user.id, { cart: user.cart }, { new: true });

  return h.response({ User: user });
}

//Delete cart 
//@route DELETE /users/cart
const deleteCart = async function (req, h) {
  const user = await User.findByIdAndUpdate(req.user.id, { cart: [] }, { new: true });
  return h.response({ User: user });
}
//Get token from model, create cookie and send respond
const sendTokenResponse = (user, h) => {
  //Create token
  const token = user.getSignedJwtToken();


  return h.response({ Token: token }).state('token', { token, firstvisit: false });
}

module.exports = {
  getAllUser,
  signUp,
  logIn,
  getUserInfo,
  deleteUserController,
  updateUserController,
  addToCart,
  authentication,
  decreaseProductFromCart,
  deleteCart
}



