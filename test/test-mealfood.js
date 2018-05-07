const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const app = require('../app.js')
const chai = require('chai')
const should = chai.should();

const MealFood = require('../models/mealfood.js')

describe("MealFood", function() {
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

  describe("create()", () => {
    it("creates relationship between meal and food", () => {
      return MealFood.create({meal_id: 1, food_id: 1})
      .then((mealfood) => {
        mealfood.should.be.an('array')
        mealfood[0].meal_name.should.eq('breakfast')
        mealfood[0].food_name.should.eq('banana')
      })
    })
  })
})
