const model = require('../model/products');


const createProduct = async (product) => {
  return await model.create(product);
}

const list = () => {
  return model.find();
}

const findProductById = async (id) => { return await model.findById(id); }

const findProductByProductname = async (name) => { return await model.findOne({ username: name }); }

const findProductByCategory = async (categoryName) => {
  return await model.find({ category: categoryName });
}

const findProductInfo = async (productID) => {
  return await model.findOne({ _id: productID }).populate('Product');
}


const deleteProduct = (id) => { return model.findByIdAndDelete(id); }

const updateProduct = (id, newProduct) => {
  return model.findByIdAndUpdate(id, newProduct, { new: true, runValidators: true });
}

const findAllProductInArray = async (arr) => {
  return await model.find({ _id: { $in: arr } });
}

module.exports = {
  createProduct,
  list,
  findProductById,
  deleteProduct,
  updateProduct,
  findProductByProductname,
  findProductByCategory,
  findAllProductInArray,
  findProductInfo
}

