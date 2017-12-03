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
    getAllQuestions: getAllQuestions,
    getPatient: getPatient,
    createPatient: createPatient,
    updatePatient: updatePatient,
    removePatient: removePatient,
    getTopics: getTopics
};