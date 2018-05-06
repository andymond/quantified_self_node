const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const app = require('../app.js')
const chai = require('chai')
const should = chai.should();
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

describe("/api/v1/meals endpoints", function() {
  this.timeout(0)

  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  })

  before((done) => {
    database.seed.run()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  })

  describe('GET api/v1/meals', () => {
    xit('returns list of all foods', () => {
      return chai.request(app)
        .get('/api/v1/meals')
        .then((response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.an('array')
          response.body.length.should.eq(4)
          response.body[0].id.should.eq(1)
          response.body[0].name.should.eq('breakfast')
          response.body[0].foods.should.be.an('array')
          response.body[2].id.should.eq(3)
          response.body[2].name.should.eq('dinner')
          response.body[2].foods.should.be.an('array')
        })
        .catch((error) => {
          throw error
        });
    });
  })
});
