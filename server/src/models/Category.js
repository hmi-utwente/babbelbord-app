/**
 * Created by ale on 08/12/2017.
 */

module.exports = (sequelize, DataTypes) =>
  sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  })