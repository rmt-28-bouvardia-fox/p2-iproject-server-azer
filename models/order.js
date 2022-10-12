'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderItem, {foreignKey: "OrderId"})
      Order.belongsTo(models.Customer, {foreignKey: 'CustomerId'})
      Order.belongsToMany(models.Bean, {
        through: models.OrderItem,
        foreignKey: "OrderId"
      })
    }
  }
  Order.init({
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};