const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

module.exports = class Meal {
  static all() {
    return database('meals')
      .leftJoin('mealfoods', 'meals.id', 'mealfoods.meal_id')
      .leftJoin('foods', 'mealfoods.food_id', 'foods.id')
      .select(['meals.id',
               'meals.name',
               database.raw('JSON_AGG(foods.*) as foods')
             ])
      .groupBy('meals.id')
      .orderBy('meals.id')
  }

  static find(id) {
    return database('meals').where('meals.id', id)
      .leftJoin('mealfoods', 'meals.id', 'mealfoods.meal_id')
      .leftJoin('foods', 'mealfoods.food_id', 'foods.id')
      .select(['meals.id',
               'meals.name',
               database.raw('JSON_AGG(foods.*) as foods')
             ])
      .groupBy('meals.id')
  }
}
