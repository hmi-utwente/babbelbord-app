/**
 * Created by ale on 03/12/2017.
 *
 * Followed this tutorial: http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/
 *
 */

var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

// add query functions
module.exports = {
    getQuestions: getQuestions,
    //getPatient: getPatient,
    //createPatient: createPatient,
    //updatePatient: updatePatient,
    //removePatient: removePatient,
    //getTopics: getTopics,
    getCategories: getCategories // just for testing purposes
};

// functions to extract and insert data into database
function getQuestions(req, res, next) {
    db.any('select * from categories')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL puppies'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getCategories(req, res, next) {
    db.any('select * from categories')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL puppies'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}