exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE mealfoods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO mealfoods(meal_id, food_id) VALUES (?, ?)',
        [2, 3]
      ),
      knex.raw(
        'INSERT INTO mealfoods(meal_id, food_id) VALUES (?, ?)',
        [4, 3]
      ),
      knex.raw(
        'INSERT INTO mealfoods(meal_id, food_id) VALUES (?, ?)',
        [2, 1]
      ),
      knex.raw(
        'INSERT INTO mealfoods(meal_id, food_id) VALUES (?, ?)',
        [2, 3]
      )
    ])
  })
}
