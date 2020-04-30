const {
  list,
  createUser,
  findUserById,
  findUserByUsername,
  deleteUser,
  updateUser,
  findUserByEmail
} = require('../respository/user.respository');


//get all user
//@route GET /users
const getAllUser = async (req, h) => {
  return await list();
}

//sign up
//@route POST /registration
const signUp = async (req, h) => {
  const { username, password, email, confirmedPassword } = req.payload;
  const userFound = await findUserByUsername(username);
  const emailExist = await findUserByEmail(email);

  if (userFound) {
    return 'User Already Registered';
  }
  else {
    if (confirmedPassword !== password) {
      return 'Confirm Password and Password must be the same!';
    }
    if (emailExist) {
      return 'Email already existed. Please choose another email';
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
    return 'Not Found';
  }
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return 'Password is not match';
  }

  return sendTokenResponse(user, h);




}

//View User Info
//@route GET /users/{id}
const getUserInfo = async (req, h) => {
  const userId = req.params.id;

  return await findUserById(userId);
}

//Delete User By Id
//@route DELETE /users/{id}
const deleteUserController = async (req, h) => {
  return await deleteUser(req.params.id);
}

//Update User 
//@route PUT /users/{id}
const updateUserController = async (req, h) => {
  const newInfo = req.payload;

  return await updateUser(req.params.id, newInfo);
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
  updateUserController
}



