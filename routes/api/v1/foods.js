var express = require('express');
var router = express.Router();
var FoodsController = require("../../../controllers/foods_controller")

router.get('/', (req, res, next) => {
  FoodsController.index(req, res, next)
})

module.exports = router;
