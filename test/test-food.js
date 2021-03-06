const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const app = require('../app.js')
const chai = require('chai')
const should = chai.should();

const Food = require('../models/food.js')

describe("Food", function() {
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
    it("returns all foods from database", () => {
      return Food.all()
      .then(function(foods) {
        foods.length.should.eq(3)
      })
      .catch((error) => {
        throw error;
      })
    })
  })

  describe("find(id)", () => {
    it("finds food from database by id", () => {
      return Food.find(1)
      .then((food) => {
        food[0].id.should.eq(1)
      })
      .catch((error) => {
        throw error;
      })
    })
  })

  describe("create(attributes)", () => {
    it("creates food with correct attributes", () => {
      return Food.create({name: "kiwi", calories: 100})
        .then((food) => {
          food[0].id.should.eq(4)
          food[0].name.should.eq("kiwi")
          food[0].calories.should.eq(100)
        })
    })
  })

  describe("update(id, attributes)", () => {
    it("updates existing food with correct attributes", () => {
      return Food.update(1, {name: "kiwi", calories: 100})
        .then((food) => {
          food[0].id.should.eq(1)
          food[0].name.should.eq("kiwi")
          food[0].calories.should.eq(100)
        })
    })
  })

  describe("destroy(id)", () => {
    it("deletes and returns existing food by id", () => {
      return Food.destroy(1)
        .then((food) => {
          food[0].id.should.eq(1)
          food[0].name.should.eq("banana")
          food[0].calories.should.eq(100)
        })
    })
  })



})
