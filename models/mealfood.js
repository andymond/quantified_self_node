const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

module.exports = class MealFood {
  static create(ids) {
    return database('mealfoods')
      .insert({meal_id: ids.meal_id, food_id: ids.food_id})
      .returning('*')
  }
}
