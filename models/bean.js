'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bean extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bean.hasOne(models.Variety, {foreignKey: "ProductId"})
    }
  }
  Bean.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bean',
  });
  return Bean;
};