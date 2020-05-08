const model = require('../model/users');


const createUser = async (user) => {
  return await model.create(user);
}

const list = () => {
  return model.find();
}

const findUserById = async (id) => { return await model.findById(id); }

const findUserByUsername = async (name) => { return await model.findOne({ username: name }).select('+password'); }

const findUserByEmail = async (email) => { return await model.findOne({ email }) }

const deleteUser = (id) => { return model.findByIdAndDelete(id); }

const updateUser = (id, newUser) => {
  return model.findByIdAndUpdate(id, newUser, { new: true, runValidators: true }).select('+password');
}

const findUserByCheckToken = async (token) => {
  return await model.findOne({
    checkToken: token,
    confirmEmailExpire: { $gt: Date.now() }
  })
}


module.exports = {
  createUser,
  list,
  findUserById,
  findUserByUsername,
  deleteUser,
  updateUser,
  findUserByEmail,
  findUserByCheckToken
}

