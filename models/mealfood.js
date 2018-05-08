const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)


module.exports = class MealFood {
  constructor(data) {
    this.data = data
  }

  static create(ids) {
    return database('mealfoods')
      .insert({meal_id: ids.meal_id, food_id: ids.food_id})
      .returning('*')
      .then(() => {
        return this.message(ids)
      })
  }

  static destroy(ids) {
    return database('mealfoods')
      .where({meal_id: ids.meal_id, food_id: ids.food_id})
      .del()
      .returning('*')
      .then(() => {
        return this.message(ids)
      })
  }

  static message(ids) {
    return database('mealfoods')
      .select('meals.name AS meal_name', 'foods.name AS food_name')
      .where({meal_id: ids.meal_id, food_id: ids.food_id})
      .join('foods', 'foods.id', 'mealfoods.food_id')
      .join('meals', 'meals.id', 'mealfoods.meal_id')
      .then((names) => {
        this.data = names
        return names
      })
  }
}
