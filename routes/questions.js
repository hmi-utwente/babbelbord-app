var express = require('express');
var pg = require('pg');
var router = express.Router();

// import the queries file, to call the appropriate function
var db = require('../queries');

router.get('/', db.getQuestions);

module.exports = router;