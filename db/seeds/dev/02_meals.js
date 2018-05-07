exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
  .then(function() {
     return knex('meals').insert([
       {id: 1, name: "breakfast"},
       {id: 2, name: "snack"},
       {id: 3, name: "lunch"},
       {id: 4, name: "dinner"}
     ])
  })
}
