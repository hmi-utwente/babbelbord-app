var express = require('express');
var pg = require('pg');
var router = express.Router();

router.get('/', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.render('db', {results: result.rows} ); }
        });
    });
});

module.exports = router;
