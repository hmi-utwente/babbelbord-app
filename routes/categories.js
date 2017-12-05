var express = require('express');
var router = express.Router();

// import the queries file, to call the appropriate function
var db = require('../queries');

router.get('/', db.getCategories);
router.get('/:id', db.getSingleCategory);

module.exports = router;