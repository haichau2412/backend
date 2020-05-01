const {
  list,
  createUser,
  findUserById,
  findUserByUsername,
  deleteUser,
  updateUser,
  findUserByEmail,
  addProductToCart
} = require('../respository/user.respository');


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
const addToCart = async (req, h) => {
  const { userID, productID, quantity, totalPrice } = req.payload;
  if (!userID) {
    return h.response({ msg: 'Please login' });
  }

  return addProductToCart(userID, { productID, quantity, totalPrice });

}

//Get token from model, create cookie and send respond
const sendTokenResponse = (user, h) => {
  //Create token
  const token = user.getSignedJwtToken();


  return h.response(token).state('token', { token, firstvisit: false });
}

module.exports = {
  getAllUser,
  signUp,
  logIn,
  getUserInfo,
  deleteUserController,
  updateUserController,
  addToCart
}



