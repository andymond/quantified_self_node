const Meal = require("../models/meal")

module.exports = class MealsController {
  static index(req, res, next) {
    Meal.all()
      .then((meals) => {
        return res.json(meals)
      })
  }
}
