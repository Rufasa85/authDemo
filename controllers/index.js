var express = require("express");
var router = express.Router();
var authRoutes = require('./authorization');

router.use('/auth',authRoutes)

module.exports = router;
