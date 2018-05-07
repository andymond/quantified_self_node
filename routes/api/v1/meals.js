var express = require('express');
var router = express.Router();
var MealsController = require("../../../controllers/meals_controller")

router.get('/', (req, res, next) => {
  MealsController.index(req, res, next)
})

module.exports = router
