const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo dog
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    life_span: {
      type: DataTypes.STRING,
      allowNull: true, // puede estar vacio
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // puede estar vacio
    },
    createInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue : true,
      allowNull: true,
    }
  });
};
