const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const pry = require("pryjs")

module.exports = class MealFood {
  static create(ids) {
    return database('mealfoods')
      .insert({meal_id: ids.meal_id, food_id: ids.food_id})
      .returning('*')
      .then((ids) => {
        return this.message(ids[0])
      })
  }

  static message(ids) {
    return database('mealfoods')
      .select('meals.name AS meal_name', 'foods.name AS food_name')
      .where({meal_id: ids.meal_id, food_id: ids.food_id})
      .join('foods', 'foods.id', 'mealfoods.food_id')
      .join('meals', 'meals.id', 'mealfoods.meal_id')
      .then((names) => {
        return names
      })
  }
}
