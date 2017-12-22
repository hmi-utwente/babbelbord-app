module.exports = (sequelize, DataTypes) =>
  sequelize.define('Category', {
    name: { type: DataTypes.STRING , unique: true},
  }, {
    timestamps: false
  });


