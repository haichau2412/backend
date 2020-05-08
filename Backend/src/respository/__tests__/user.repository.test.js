const mongoose = require('mongoose');
const faker = require('faker');

const mongoDB = "mongodb://127.0.0.1/myTest";
mongoose.connect(mongoDB);

const User = require('../../model/users');

const userRepository = require('../user.repository');
const mockPassword = faker.random.words();

const mockUser = {
  username: faker.name.findName(),
  password: mockPassword,
  email: faker.internet.email()
}

describe('User repository test', () => {
  beforeAll(async () => {
    await User.remove();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });


  it('Has a module', () => {
    expect(userRepository).toBeDefined();
  })


  describe('Create user', () => {
    it('Create user', async () => {
      const user = await userRepository.createUser(mockUser);
      expect(user).toBeDefined();
      expect(user._id).toBeDefined();
      expect(user.username).toBe(mockUser.username);
      expect(user.email).toBe(mockUser.email);
      expect(await user.matchPassword(mockUser.password)).toBe(true);
    })
  });

  describe('Get user by username', () => {
    it('Get user by username', async () => {
      const foundUser = await userRepository.findUserByUsername(mockUser.username);
      expect(foundUser).toBeDefined();
      expect(foundUser._id).toBeDefined();
      expect(foundUser.username).toBe(mockUser.username);
      expect(foundUser.email).toBe(mockUser.email);
      expect(await foundUser.matchPassword(mockUser.password)).toBe(true);
    })
  });

  describe('Update User', () => {
    it('Update user', async () => {
      const newUser = {
        username: faker.name.findName(),
        email: faker.internet.email()
      }
      const foundUser = await userRepository.findUserByUsername(mockUser.username);
      const userUpdated = await userRepository.updateUser(foundUser._id, newUser);
      expect(userUpdated).toBeDefined();
      expect(userUpdated._id).toBeDefined();
      expect(userUpdated.username).toBe(newUser.username);
      expect(userUpdated.email).toBe(newUser.email);
    })
  });


});

