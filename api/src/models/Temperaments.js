const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo temperament
  sequelize.define('temperaments', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};