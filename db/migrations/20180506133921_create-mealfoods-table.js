
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE mealfoods(
    id SERIAL PRIMARY KEY NOT NULL,
    food_id INTEGER REFERENCES foods(id),
    meal_id INTEGER REFERENCES meals(id)
  );`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE mealfoods;`
  return knex.raw(dropQuery)
};
