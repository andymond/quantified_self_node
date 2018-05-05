const Food = require("../models/food")

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
    Food.create(req.params).then((food) => {
      return res.json(food)
    })
  }
}
