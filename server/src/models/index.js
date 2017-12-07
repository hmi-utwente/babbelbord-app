/**
 * Created by ale on 07/12/2017.
 */
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const db = {}

sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect:  'postgres',
  protocol: 'postgres',
  port:     match[4],
  host:     match[3],
  logging:  true //false
})

fs
  .readSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname,file))
    db[model.name] = model
})

db.sequelize = sequelize
db.Sequelize = Sequelize


module.exports = {

}
