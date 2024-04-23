import { use, expect as _expect, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'; // Assuming your Express app is exported from app.js
import User from '../models/user'; // Assuming you have a User model

use(chaiHttp);
const expect = _expect;

describe('Test Routes', () => {
  before(async () => {
    // Add any necessary setup code here, e.g., seeding the database with test data
  });

  after(async () => {
    // Add any necessary teardown code here, e.g., deleting test data from the database
  });

  describe('GET /users', () => {
    it('should return an array of users', async () => {
      const res = await request(app).get('/users');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      // Add more assertions to validate the response data as needed
    });
  });
});