const Food = require("../models/food")

module.exports = class FoodsController {
  static index(req, res, next) {
    Food.all()
      .then((foods) => {
        return res.status(200).json(foods)
      })
  }
}
