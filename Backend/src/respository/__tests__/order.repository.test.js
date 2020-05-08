const mongoose = require('mongoose');
const faker = require('faker');

const mongoDB = "mongodb://127.0.0.1/myTest";
mongoose.connect(mongoDB);

const Order = require('../../model/orders');

const orderRepository = require('../order.repository');
const userRepository = require('../user.repository');
const productRepository = require('../product.repository');



const mockUser = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email()
}
const mockProduct = {
  name: faker.name.findName(),
  category: 'Pizza' || 'Drink' || 'Dessert',
  description: faker.random.words(),
  price: faker.random.number(),
  photo: faker.random.image(),
  size: 'S' || 'M' || 'L'
}




describe('Order repository test', () => {
  beforeAll(async () => {
    await Order.remove();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Has a module', () => {
    expect(orderRepository).toBeDefined();
  })


  describe('Create order', () => {
    it('Create order', async function () {
      const user = await userRepository.createUser(mockUser);
      const product = await productRepository.createProduct(mockProduct);

      const mockOrder = {
        userID: user._id,
        cart: [
          {
            productID: product._id,
            quantity: 3,
            totalPrice: product.price * this.quantity
          }
        ],
        totalPrice: this.totalPrice + this.cart.forEach(totalPrice => {
          totalPrice += totalPrice;
        }),
        address: faker.address.streetAddress()
      }

      const order = await orderRepository.createOrder(mockOrder);
      expect(order).toBeDefined();
      expect(order._id).toBeDefined();
      expect(order.cart).toBe(mockOrder.cart);
      expect(order.address).toBe(mockOrder.address);
      expect(order.price).toBe(mockOrder.price);
    })
  });

  // describe('Get user by username', () => {
  //   it('Get user by username', async () => {
  //     const foundUser = await userRepository.findUserByUsername(mockUser.username);
  //     expect(foundUser).toBeDefined();
  //     expect(foundUser._id).toBeDefined();
  //     expect(foundUser.username).toBe(mockUser.username);
  //     expect(foundUser.email).toBe(mockUser.email);
  //     expect(await foundUser.matchPassword(mockUser.password)).toBe(true);
  //   })
  // });

  // describe('Update User', () => {
  //   it('Update user', async () => {
  //     const newUser = {
  //       username: faker.name.findName(),
  //       email: faker.internet.email()
  //     }
  //     const foundUser = await userRepository.findUserByUsername(mockUser.username);
  //     const userUpdated = await userRepository.updateUser(foundUser._id, newUser);
  //     expect(userUpdated).toBeDefined();
  //     expect(userUpdated._id).toBeDefined();
  //     expect(userUpdated.username).toBe(newUser.username);
  //     expect(userUpdated.email).toBe(newUser.email);
  //   })
  // });


});

