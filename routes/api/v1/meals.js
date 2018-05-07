var express = require('express');
var router = express.Router();
var MealsController = require("../../../controllers/meals_controller")

router.get('/', (req, res, next) => {
  MealsController.index(req, res, next)
})

router.get('/:id/foods', (req, res, next) => {
  MealsController.show(req, res, next)
})

module.exports = router
