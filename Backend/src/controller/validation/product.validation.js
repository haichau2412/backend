const Joi = require('joi');
const joiImg = require('joi-image-extension');
const Joii = Joi.extend(joiImg);

const createProductPayload = {
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().max(500),
  price: Joi.number().required(),
  photo: Joi.string()
};



const idPayload = {
  id: Joi.string().required().description('record id')
};

const createProductValidations = {
  all: { payload: Joi.object(createProductPayload) },
};

const deleteValidation = {
  id: {
    params: idPayload
  }
};


module.exports = {
  createProductValidations,
  deleteValidation

}