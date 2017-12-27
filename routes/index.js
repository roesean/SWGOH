var express = require('express');
var router = express.Router();

var indexController = require("../controllers/index-controller.js")

router.get('/profile', indexController.getProfile);
router.get('/hero', indexController.getHeroCollection);
router.get('/ship', indexController.getHeroCollection);
router.get('/guild', indexController.getGuild);

module.exports = router;
