 /*
 * Created by ale on 08/12/2017.
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('Topic', {
    name: { type: DataTypes.STRING },
  }, {
   timestamps: false
 })
