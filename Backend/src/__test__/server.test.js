const { Hapi } = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/myTest';
mongoose.connect(mongoDB);

describe('Route test', () => {
  it('Has a module', () => {
    expect(Hapi).toBeDefined();
  });

  let server;

  beforeAll(() => {
    server = Hapi.server({
      port: process.env.PORT,
      host: 'localhost'
    });
  });

  afterAll((done) => {
    mongoose.connection.close();
    server.close(done);
  });


  describe("user route test", () => {
    it("can list users", async () => {
      const requestDefaults = {
        method: 'GET',
        url: '/users',
        payload: {}
      };

      const request = Object.assign({}, requestDefaults);

      return server.inject(request)
        .then(response => {
          response.is(response.statusCode, 400, 'status code is 400');
        });
    })
  })
})