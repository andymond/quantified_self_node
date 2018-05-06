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

  describe("GET /api/v1/meals", () => {
    return chai.request(app)
      .get('/api/v1/foods')
      .then((response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.an("array")
        response.body.length.should.eq(3)
        response.body[0].id.should.eq(1)
        response.body[0].name.should.eq("lunch")
        response.body[0].foods.should.be.an("array")
        response.body[0].foods[0].id.should.eq(1)
        response.body[0].foods[0].name.should.eq("ham sandwich")
        response.body[0].foods[0].calories.should.eq(700)
      })
      .catch((error) => {
        throw error
      });
  });
  })
})
