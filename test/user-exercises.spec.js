/* eslint-disable no-undef */
const app = require('../src/app');
const mongoose = require('mongoose');
const { TEST_ATLAS_URI } = process.env;
const seedTestTables = require('./fixtures/seedTestTables');
const { makeUsersArray } = require('./fixtures/dbcontent.fixtures');
const Actions = require('./fixtures/action.fixtures');

describe('User-Exercises Endpoint', () => {
  before('connect to db', () => {
    mongoose.connect(TEST_ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    const { connection } = mongoose;
    connection.once('open', () => {
      console.log('MongoDB database connected successfully');
    });
  });

  before('seed collections', () => seedTestTables(TEST_ATLAS_URI));

  beforeEach(done => setTimeout(done, 500));

  it('returns 200 and all USER exercises for logged in user', () => {
    const testUsers = makeUsersArray();

    return supertest(app)
      .get('/api/EXAMPLE-user-exercises')
      .set('Authorization', Actions.makeAuthHeader(testUsers[1]))
      .expect(200)
      .then(res => {
        expect(res.body.userExercises).to.be.an('array');
        res.body.userExercises.forEach(exc => {
          expect(exc.user_id).to.eql(testUsers[1]._id);
          expect(exc).to.have.property('frequency');
          expect(exc).to.have.property('duration');
          expect(exc.exercise).to.have.property('exercise_name');
        });
      });
  });
});