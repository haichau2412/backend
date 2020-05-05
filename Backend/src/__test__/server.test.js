const route = require('../controller/route/index');
const request = require('supertest');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/myTest';
mongoose.connect(mongoDB);

describe('Route test', () => {
  it('Has a module', () => {
    expect(route).toBeDefined();
  });

  let server;

  beforeAll(() => {
    server = route.listen(5000);
  });

  afterAll((done) => {
    mongoose.connection.close();
    server.close(done);
  });

  describe("user route test", () => {
    it("can list users", async () => {
      await request(server).get("/users").expect(200);
    })
  })
})