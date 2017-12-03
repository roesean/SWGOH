var express = require('express');
var router = express.Router();

var indexController = require("../controllers/index-controller.js")

router.get('/profile', indexController.getProfile);
router.get('/collection', indexController.getCollection);
router.get('/guild', indexController.getGuild);

module.exports = router;
