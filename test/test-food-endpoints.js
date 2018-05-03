const app = require('../app.js')
const chai = require('chai')
const expect = chai.expect
const assert = require('assert')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const requester = chai.request(app)

describe('api/v1 foods endpoints', function() {
  it('/foods returns list of all foods', function() {
    requester.get('/api/v1/foods').end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)

      let results = JSON.parse(res.body)

      expect(results).to.be.an('array')
      expect(results).count.to.eq(3)
      expect(results[0].id).to.eq(1)
      expect(results[0].id).to.eq("testfood1")
      expect(results[0].id).to.eq(100)
      expect(results[2].id).to.eq(3)
      expect(results[2].id).to.eq("testfood3")
      expect(results[2].id).to.eq(1000)
    });
  });
});
