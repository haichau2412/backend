const mongoose = require('mongoose');


const mongoDB = "mongodb://127.0.0.1/myTest";
mongoose.connect(mongoDB);

const User = require('../../model/users');

describe('User model test', () => {
  beforeAll(async () => {
    await User.remove();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Has a module', () => {
    expect(User).toBeDefined();
  })


  describe('Create user', () => {
    it('Create', async () => {
      const user = new User({ username: 'dp', password: '123456', confirmedPassword: '123456', email: 'dq@gmail.com' });

      const newUser = await user.save();
      const expected1 = 'dp';
      const actual1 = newUser.username;
      const expected2 = 'dq@gmail.com';
      const actual2 = newUser.email;
      expect(actual1).toEqual(expected1);
      expect(actual2).toEqual(expected2);

    })
  });

  describe('Get user by username', () => {
    it('Get user by username', async () => {
      const foundUser = await User.findOne({ username: 'dp' });
      const expected = 'dp';
      const actual = foundUser.username;
      expect(actual).toEqual(expected);
    })
  });

  describe('Update User', () => {
    it('Update user', async () => {
      const userUpdated = await User.findOneAndUpdate({ username: 'dp' }, { username: 'pqqq' }, { new: true });
      const expected = 'pqqq';
      const actual = userUpdated.username;
      expect(actual).toEqual(expected);
    })
  });


});

