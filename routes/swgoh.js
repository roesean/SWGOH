var express = require('express');
var router = express.Router();

var swgohController = require("../controllers/swgoh-controller.js")

//http://localhost:3000/api/v1/swgoh
router.get('/collection', swgohController.collection);
router.get('/ships', swgohController.ships);
router.get('/profile', swgohController.profile);
router.get('/guild', swgohController.guild);

module.exports = router;
