/**
 * Created by ale on 07/12/2017.
 */
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const db = {}

const sequelize = new Sequelize('postgres://cyhqwpgxezzsiy:f67e2de03bb5fd2ea49b5fcef56898083d882ae9c88672f5188b026c0da1adb9@ec2-184-73-189-190.compute-1.amazonaws.com:5432/d3f8dhq054cbbf', {
  dialect:  'postgres',
  protocol: 'postgres',
  port:     5432,
  host:     'ec2-184-73-189-190.compute-1.amazonaws.com',
  logging:  true //false
})

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname,file))
    console.log(model);
    //db[model.name] = model
})

db.sequelize = sequelize
db.Sequelize = Sequelize


module.exports = {

}
