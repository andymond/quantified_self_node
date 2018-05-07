const Meal = require("../models/meal")

module.exports = class MealsController {
  static index(req, res, next) {
    Meal.all()
      .then((meals) => {
        return res.json(meals)
      })
  }

  static show(req, res, next) {
    Meal.find(req.params.id)
      .then((meal) => {
        return res.json(meal)
      })
  }
}
