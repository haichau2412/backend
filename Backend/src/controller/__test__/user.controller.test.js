const faker = require('faker');
const mongoose = require('mongoose');
const userController = require('../user.controller');


const mongoDB = "mongodb://127.0.0.1/myTest";
mongoose.connect(mongoDB);

const User = require('../../model/users');

describe('User model test', () => {

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Has a module', () => {
    expect(userController).toBeDefined();
  });

  it('Should get all user', async () => {
    const list = userController.getAllUser({}, {});
    expect(list).toBeDefined();
  });

  it('Should return a message email sent after registration', async () => {
    const mockUser = {
      username: faker.internet.userName,
      password: faker.internet.password,
      confirmedPassword: this.password,
      email: faker.internet.email
    }
    const mockReq = { payload: mockUser }
    const user = await userController.signUp(mockReq, {});
    expect(user).toBeDefined();
  });
})

