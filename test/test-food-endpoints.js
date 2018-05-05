const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const app = require('../app.js')
const chai = require('chai')
const should = chai.should();
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

describe('api/v1 foods endpoints', function() {
  this.timeout(0)

  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  })

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  })

  it('should return a 404 with text', () => {
    return chai.request(app)
      .get('/sad')
      .then((response) => {
        response.should.have.status(404);
        response.text.should.include("Not Found")
      })
      .catch((error) => {
        throw error;
      });
  });

  it('GET /foods returns list of all foods', () => {
    return chai.request(app)
      .get('/api/v1/foods')
      .then((response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body.length.should.eq(3)
        response.body[0].id.should.eq(1)
        response.body[0].name.should.eq("ham sandwich")
        response.body[0].calories.should.eq(700)
        response.body[2].id.should.eq(3)
        response.body[2].name.should.eq("ice cream")
        response.body[2].calories.should.eq(500)
      })
      .catch((error) => {
        throw error
      });
  });
});
