const express = require('express');
const router = express.Router();
const MealsController = require("../../../controllers/meals_controller")
const MealFoodsController = require("../../../controllers/mealfoods_controller")


router.get('/', (req, res, next) => {
  MealsController.index(req, res, next)
})

router.get('/:id/foods', (req, res, next) => {
  MealsController.show(req, res, next)
})

router.post('/:meal_id/foods/:food_id', (req, res, next) => {
  MealFoodsController.create(req, res, next)
})

router.delete('/:meal_id/foods/:food_id', (req, res, next) => {
  MealFoodsController.destroy(req, res, next)
})

module.exports = router
