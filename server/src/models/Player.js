 /*
 * Created by ale on 08/12/2017.
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('Player', {
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    skipQuestions: {
     type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    skipTopics: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
  })

