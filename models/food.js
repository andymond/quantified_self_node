const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

module.exports = class Food {
  static all() {
    return database('foods').select('id', 'name', 'calories')
  }

  static find(id) {
    return database('foods').where('id', id)
  }

  static check(attrs) {
    if(attrs.name != undefined && attrs.calories != undefined) {
      return attrs
    } else {
      throw "Missing name or calories!"
    }
  }

  static create(attrs) {
    let valid = this.check(attrs);
    return database('foods').insert({
      name: valid.name,
      calories: valid.calories
    }).returning('*')
  }

  static update(id, attrs) {
    return database('foods').where('id', id)
      .update({
        name: attrs.name,
        calories: attrs.calories
      }).returning('*')
  }
}
