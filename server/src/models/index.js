const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(config.db.databaseURL, {
  dialect:  config.db.dialect,
  protocol: config.db.dialect,
  port:     config.db.port,
  host:     config.db.host,
  dialectOptions: config.db.dialectOptions,
  logging:  true //false
})

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
