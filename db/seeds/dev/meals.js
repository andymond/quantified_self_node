exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE mealfoods RESTART IDENTITY')
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
  .then(function() {
     return Promise.all([
       knex.raw(
         'INSERT INTO meals (name) VALUES(?)',
         ["breakfast"]
       ),
       knex.raw(
         'INSERT INTO meals (name) VALUES(?)',
         ["lunch"]
       ),
       knex.raw(
         'INSERT INTO meals (name) VALUES(?)',
         ["dinner"]
       ),
       knex.raw(
         'INSERT INTO meals (name) VALUES(?)',
         ["snack"]
       )
     ])
  })
}
