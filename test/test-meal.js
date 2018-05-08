const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const app = require('../app.js')
const chai = require('chai')
const should = chai.should();

const Meal = require('../models/meal.js')

describe("Meal", function() {
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

  describe("all()", () => {
    it("returns all meals and their foods", () => {
      return Meal.all()
      .then((meals) => {
        meals.length.should.eq(4)
        meals[0].id.should.eq(1)
        meals[0].name.should.eq("breakfast")
        meals[0].foods.should.be.an("array")
        should.equal(meals[0].foods[0], null)
        meals[3].id.should.eq(4)
        meals[3].name.should.eq("dinner")
        meals[3].foods.should.be.an("array")
        meals[3].foods[0].id.should.eq(3)
        meals[3].foods[0].name.should.eq("ham sandwich")
        meals[3].foods[0].calories.should.eq(700)
      })
    })
  })

  describe("find(id)", () => {
    it("returns meal and its foods by id", () => {
      return Meal.find(2)
      .then((meal) => {
        meal.length.should.eq(1)
        meal[0].id.should.eq(2)
        meal[0].name.should.eq("snack")
        meal[0].foods.should.be.an("array")
      })
    })
  })
})
