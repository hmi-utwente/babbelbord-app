 /*
 * Created by ale on 08/12/2017.
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('Question', {
    question: {
      type: DataTypes.TEXT,
    },
    subquestions: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    category: {
      type: DataTypes.INTEGER,
    },
    topics: {
     type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
  }, {
    timestamps: false
  })
