const app = require('../app.js')
const chai = require('chai')
const expect = chai.expect
const assert = require('assert')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const requester = chai.request(app)

describe('test', function() {
  it('test setup', function() {
    requester.get('/').end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200);
    });
  });
});
