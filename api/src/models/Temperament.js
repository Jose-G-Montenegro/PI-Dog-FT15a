const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo temperament
  sequelize.define('temperament', {
    temperament: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};