/**
 * Created by ale on 07/12/2017.
 */

module.exports = (sequelize, DataTypes) => {
  sequelize.define('Patient', {
    name: {
      type: DataTypes.STRING,
      // unique avoids to have two or more people with the same name
      unique: true
    }
  })
}