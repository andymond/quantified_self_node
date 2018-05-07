const MealFood = require("../models/mealfood")
const Meal = require('../models/meal')
const Food = require('../models/food')

module.exports = class MealFoodsController {
  static create(req, res, next) {
    let ids = req.params
    MealFood.create(ids)
      .then((names) => {
        res.status(201).json({message: `Successfully added ${names[0].food_name} to ${names[0].meal_name}`})
      })
  }
}
