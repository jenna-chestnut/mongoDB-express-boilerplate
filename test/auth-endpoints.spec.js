// /* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../src/app');
const { TEST_ATLAS_URI } = process.env;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const seedTestTables = require('./fixtures/seedTestTables');
const { JWT_SECRET, JWT_EXPIRY } = require('../src/config');
const Actions = require('./fixtures/action.fixtures');
const Content = require('./fixtures/dbcontent.fixtures');


describe('/login and /register endpoints', () => {
  before('connect to db', () => {
    mongoose.connect(TEST_ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    const { connection } = mongoose;
    connection.once('open', () => {
      console.log('MongoDB database connected successfully');
    });
  });

  before('seed tables', () => seedTestTables(TEST_ATLAS_URI));

  beforeEach(done => setTimeout(done, 500));

  after('disconnect from db', () => mongoose.connection.close());

  const testUsers = Content.makeUsersArray();

  describe('POST api/auth/login Endpoint', () =>{
    const requiredFields = ['user_name', 'password'];

    requiredFields.forEach(field => {
      const loginAttemptBody = {
        user_name: testUsers[0].user_name,
        password: testUsers[0].password
      };
  
      it(`responds with 400 required error when ${field} is missing`, () => {
        delete loginAttemptBody[field];
  
        return supertest(app)
          .post('/api/auth/login')
          .send(loginAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`
          });
      });
  
      it(`responds with 400 'Invalid user_name or password' when bad ${field}`, () => {
        loginAttemptBody[field] = `invalid-${field}`;
  
        return supertest(app)
          .post('/api/auth/login')
          .send(loginAttemptBody)
          .expect(400, {
            error: 'Invalid user_name or password'
          });
      });
    });
  
  
    it('responds 200 and JWT auth token using secret when valid credentials', () => {
      const validUserCreds = {
        user_name: testUsers[0].user_name,
        password: testUsers[0].password
      };
  
      const expectedToken = jwt.sign(
        { 
          user_id: testUsers[0]._id,
          name: testUsers[0].full_name,
          is_admin: testUsers[0].is_admin,
          is_provider: testUsers[0].is_provider 
        }, //payload
        JWT_SECRET,
        {
          subject: testUsers[0].user_name,
          expiresIn: JWT_EXPIRY,
          algorithm: 'HS256'
        }
      );
  
      return supertest(app)
        .post('/api/auth/login')
        .send(validUserCreds)
        .expect(200, {
          authToken: expectedToken
        });
    });
  });

  describe('POST api/auth/register Endpoint', () => {
    const requiredFields = ['user_name', 'full_name', 'password', 'is_admin', 'is_provider'];


    describe('api/auth/register validation', () => {
      requiredFields.forEach(field => {
        const regAttemptBody = Actions.makeNewUser();
    
        it(`responds with 400 required error when ${field} is missing`, () => {
          delete regAttemptBody[field];
    
          return supertest(app)
            .post('/api/auth/register')
            .set('Authorization', Actions.makeAuthHeader(testUsers[0]))
            .send(regAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body`
            });
        });
      });
  
      it('responds with 400 \'User name not available\' when username already exists', () => {
        const badUserReg = Actions.makeNewUser();
        badUserReg.user_name = testUsers[0].user_name;
  
        return supertest(app)
          .post('/api/auth/register')
          .set('Authorization', Actions.makeAuthHeader(testUsers[0]))
          .send(badUserReg)
          .expect(400, {
            error: 'User name not available'
          });
      });
  
      it('responds with 400 \'Password must be longer than 8 characters\' when password less than 8 characters', () => {
        const shortPw = Actions.makeNewUser();
        shortPw.password = 'short';
  
        return supertest(app)
          .post('/api/auth/register')
          .set('Authorization', Actions.makeAuthHeader(testUsers[0]))
          .send(shortPw)
          .expect(400, {
            error: 'Password must be longer than 8 characters'
          });
      });
  
      it('responds with 400 \'Password must be shorter than 72 characters\' when password more than 72 characters', () => {
        const longPw = Actions.makeNewUser();
        longPw.password = '*'.repeat(73);
  
        return supertest(app)
          .post('/api/auth/register')
          .set('Authorization', Actions.makeAuthHeader(testUsers[0]))
          .send(longPw)
          .expect(400, {
            error: 'Password must be less than 72 characters'
          });
      });
  
      it('responds with 400 \'Password must not start or end with empty spaces\' when password has spaces at beginning or end', () => {
        const spaceyPw = Actions.makeNewUser();
        spaceyPw.password = ' aP@ssw0rd!';
  
        return supertest(app)
          .post('/api/auth/register')
          .set('Authorization', Actions.makeAuthHeader(testUsers[0]))
          .send(spaceyPw)
          .expect(400, {
            error: 'Password must not start or end with empty spaces'
          })
          .then(() => {
            spaceyPw.password = 'aP@ssw0rd! ';
            return supertest(app)
              .post('/api/auth/register')
              .set('Authorization', Actions.makeAuthHeader(testUsers[0]))
              .send(spaceyPw)
              .expect(400, {
                error: 'Password must not start or end with empty spaces'
              });
          });
      });
    });
  
    describe('successful registration', () => {
      it('when valid credentials, creates new user in users_table, then responds 201', () => {
        const newUser = Actions.makeNewUser();
  
        return supertest(app)
          .post('/api/auth/register')
          .set('Authorization', Actions.makeAuthHeader(testUsers[0]))
          .send(newUser)
          .expect(201)
          .then(() => {
            return supertest(app)
              .post('/api/auth/login')
              .send(newUser)
              .expect(200);
          });
      });
    });
  });
});
