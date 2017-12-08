module.exports = (sequelize, DataTypes) => {
  sequelize.define('Patient', {
    name: {
      type: DataTypes.STRING,
      // unique avoids to have two or more people with the same name
      unique: true
    }
  })
}
=======
 * Created by ale on 08/12/2017.
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('Patient', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    skipQuestions: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
  })
>>>>>>> temp
