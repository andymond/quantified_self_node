const Food = require("../models/food")
pry = require("pryjs")

module.exports = class FoodsController {
  static index(req, res, next) {
    Food.all()
      .then((foods) => {
        return res.status(200).json(foods)
      })
  }

  static show(req, res, next) {
    let id = req.params.id
    Food.find(id).then((food) => {
      return res.json(food)
    })
  }

  static create(req, res, next) {
    Food.create(req.body.food).then((food) => {
      return res.json(food)
    })
  }

  static update(req, res, next) {
    let id = req.params.id
    let attrs = req.body.food
    Food.update(id, attrs).then((food) => {
      return res.json(food)
    })
  }
}
