
/* eslint-disable no-undef */
const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, MongoDB and Express Boilerplate!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, MongoDB and Express Boilerplate!');
  });
});
