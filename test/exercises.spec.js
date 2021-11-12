/* eslint-disable no-undef */
const app = require('../src/app');
const mongoose = require('mongoose');
const { TEST_ATLAS_URI } = process.env;
const seedTestTables = require('./fixtures/seedTestTables');

describe('App', () => {
  before('connect to db', () => {
    mongoose.connect(TEST_ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    const { connection } = mongoose;
    connection.once('open', () => {
      console.log('MongoDB database connected successfully');
    });
  });

  before('seed collections', () => seedTestTables(TEST_ATLAS_URI));

  beforeEach(done => setTimeout(done, 500));

  it('GET / responds with 200 containing "Hello, MongoDB and Express Boilerplate!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, MongoDB and Express Boilerplate!');
  });

  it('GET /api/EXAMPLE responds with 200 and list of exercises', () => {
    return supertest(app)
      .get('/api/EXAMPLE-exercises')
      .expect(200)
      .then(res => {
        console.log(res.body);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(2);
      });
  });
});