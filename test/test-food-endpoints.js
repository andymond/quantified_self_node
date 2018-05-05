const app = require('../app.js')
const chai = require('chai')
const expect = chai.expect
const assert = require('assert')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

describe('api/v1 foods endpoints', function() {
  this.timeout(0)
  it('should return a 404 with text', () => {
    chai.request(app)
      .get('/sad')
      .then((response) => {
        expect(response.status).to.eq(404);
        expect(response.text).to.include("Not Found")
      })
      .catch((error) => {
        throw error;
      });
  });

  it('/foods returns list of all foods', function() {
    chai.request(app)
      .get('/api/v1/foods')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.be.json
        expect(response).to.be.an('array')
        expect(response).count.to.eq(3)
        expect(response[0].id).to.eq(1)
        expect(response[0].id).to.eq("testfood1")
        expect(response[0].id).to.eq(100)
        expect(response[2].id).to.eq(3)
        expect(response[2].id).to.eq("testfood3")
        expect(response[2].id).to.eq(1000)
      })
      .catch((error) => {
        throw error
      });
  });
});
