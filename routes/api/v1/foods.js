var express = require('express');
var router = express.Router();
var FoodsController = require("../../../controllers/foods_controller")

router.get('/', (req, res, next) => {
  FoodsController.index(req, res, next)
})

router.get('/:id', (req, res, next) => {
  FoodsController.show(req, res, next)
})

router.post('/', (req, res, next) => {
  Foodscontroller.create(req, res, next)
})

module.exports = router;
