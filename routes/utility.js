var express = require('express');
var router = express.Router();

var utilityController = require("../controllers/utility-controller.js")

//http://localhost:3000/api/v1/utility
router.get('/character-url-list', utilityController.characterUrlList);
router.get('/character-master', utilityController.characterMaster);
router.get('/ship-url-list', utilityController.shipUrlList);
router.get('/ship-master', utilityController.shipMaster);

module.exports = router;
