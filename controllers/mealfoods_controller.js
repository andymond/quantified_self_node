const MealFood = require("../models/mealfood")
const Meal = require('../models/meal')
const Food = require('../models/food')

module.exports = class MealFoodsController {
  static create(req, res, next) {
    let ids = req.params
    MealFood.create(ids)
      .then((names) => {
        res.status(201).json({
          message: `Successfully added ${names[0].food_name} to ${names[0].meal_name}`
        })
      })
  }

  static destroy(req, res, next) {
    let ids = req.params
    let names = MealFood.data
    MealFood.destroy(ids)
      .then(() => {
        res.json({
          message: `Successfully removed ${names[0].food_name} from ${names[0].meal_name}`
        })
      })
  }
}
