const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo temperament
  sequelize.define('temperaments', {
    // id:{
    //   type: DataTypes.UUID,
    //   primaryKey: true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};