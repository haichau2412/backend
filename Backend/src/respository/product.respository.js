const model = require('../model/products');


const createProduct = async (product) => {
  return await model.create(product);
}

const list = () => {
  return model.find().sort(1);
}

const findProductById = async (id) => { return await model.findById(id); }

const findProductByProductname = async (name) => { return await model.findOne({ username: name }); }

const findProductByCategory = async (categoryName) => {
  return await model.find({ category: categoryName });
}


const deleteProduct = (id) => { return model.findByIdAndDelete(id); }

const updateProduct = (id, newProduct) => {
  return model.findByIdAndUpdate(id, newProduct, { new: true, runValidators: true });
}

module.exports = {
  createProduct,
  list,
  findProductById,
  deleteProduct,
  updateProduct,
  findProductByProductname,
  findProductByCategory
}

