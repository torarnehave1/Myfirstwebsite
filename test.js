import fetch from 'node-fetch';
import { expect as _expect } from 'chai';
const expect = _expect;

describe('API Test', function() {
  it('should return valid JSON', async function() {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      console.log('Status:', response.status, response.statusText);
      expect(response.ok).to.be.true;

      const data = await response.json();
      expect(data).to.be.an('array');
    } catch (error) {
      console.error(error);
      throw new Error(`Request failed: ${error}`);
    }
  });
});