
const Joi = require('joi');

const signUpPayload = {
  username: Joi.string().required(),
  password: Joi.string().required(),
  confirmedPassword: Joi.ref('password'),
  email: Joi.string().email().required(),
  fullname: Joi.string()
};

const loginPayload = {
  username: Joi.string().required(),
  password: Joi.string().required(),
};

const idPayload = {
  id: Joi.string().required().description('record id')
};

const signUpValidations = {
  all: { payload: Joi.object(signUpPayload) },
};

const loginValidations = {
  all: { payload: Joi.object(loginPayload) },
};

const deleteValidation = {
  id: {
    params: idPayload
  }
};


module.exports = {
  signUpValidations,
  loginValidations,
  deleteValidation

}