 /*
 * Created by ale on 08/12/2017.
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('Question', {
    question: {
      type: DataTypes.TEXT,
    },
    subquestions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    category: {
      type: DataTypes.INTEGER,
    },
    topics: {
     type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false
  })
