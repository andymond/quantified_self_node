const MealFood = require("../models/mealfood")
const Meal = require('../models/meal')
const Food = require('../models/food')

module.exports = class MealFoodsController {
  static create(ids) {
    MealFood.create(ids)
      .then((mealfood) => {
        res.status(201).json(mealfood)
      })
  }
}
