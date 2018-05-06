const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const app = require('../app.js')
const chai = require('chai')
const should = chai.should();
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

describe('/api/v1/foods endpoints', function() {
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

  describe('GET api/v1/foods', () => {
    it('returns list of all foods', () => {
      return chai.request(app)
        .get('/api/v1/foods')
        .then((response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.an('array')
          response.body.length.should.eq(3)
          response.body[0].id.should.eq(1)
          response.body[0].name.should.eq("banana")
          response.body[0].calories.should.eq(100)
          response.body[2].id.should.eq(3)
          response.body[2].name.should.eq("ham sandwich")
          response.body[2].calories.should.eq(700)
        })
        .catch((error) => {
          throw error
        });
    });
  })

  describe('GET api/v1/foods/:id', () => {
    it('returns a specific food by id', () => {
      return chai.request(app)
        .get('/api/v1/foods/1')
        .then((response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.an('array')
          response.body.length.should.eq(1)
          response.body[0].id.should.eq(1)
          response.body[0].name.should.eq("banana")
          response.body[0].calories.should.eq(100)
        })
    })
  })

  describe('POST api/v1/foods', () => {
    it('creates & returns new food', () => {
      return chai.request(app)
        .post('/api/v1/foods')
        .send(
          {name: "pizza", calories: "800"}
        )
        .then((response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.an('array')
          response.body.length.should.eq(1)
          response.body[0].id.should.eq(4)
          response.body[0].name.should.eq("pizza")
          response.body[0].calories.should.eq(800)
        })
    })
  })

  describe('PATCH api/v1/foods', () => {
    it('updates & returns new food', () => {
      return chai.request(app)
        .patch('/api/v1/foods')
        .send(
          { "food": { "name": "banana", "calories": "105" } }
        )
        .then((response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.an('array')
          response.body.length.should.eq(1)
          response.body[0].id.should.eq(1)
          response.body[0].name.should.eq("banana")
          response.body[0].calories.should.eq(105)
        })
    })
  })

});
