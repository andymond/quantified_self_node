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
      .then((message) => {
        message.should.be.an('array')
        message[0].meal_name.should.eq('breakfast')
        message[0].food_name.should.eq('banana')
      })
    })
  })

  describe("destroy()", () => {
    it("destroys relationship between meal and food", () => {
      let names = MealFood.data
      return MealFood.destroy({meal_id: 1, food_id: 1})
      .then(() => {
        names.should.be.an('array')
        names[0].meal_name.should.eq('breakfast')
        names[0].food_name.should.eq('banana')
      })
    })
  })
})
