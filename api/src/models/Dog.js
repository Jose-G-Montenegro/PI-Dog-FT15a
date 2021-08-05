const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo dog
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true, // que tenga prymary key
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // que no este vacio
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false, // que no este vacio
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false, // que no este vacio
    },
    years_life: {
      type: DataTypes.STRING,
      allowNull: true, // puede estar vacio
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // puede estar vacio
    },
    createinDB: {
      type: DataTypes.BOOLEAN,
      defaultValue : true,
      allowNull: true,
    }
  });
};
