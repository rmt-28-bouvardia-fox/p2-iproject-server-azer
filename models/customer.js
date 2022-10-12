'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, {foreignKey: 'CustomerId'})
    }
  }
  Customer.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username has been used'
      },
      validate: {
        notEmpty: {
          msg: 'Username is required'
        },
        notNull: {
          msg: 'Username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email has been used'
      },
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        notNull: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Format email wrong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        notNull: {
          msg: 'Password is required'
        }        
      }
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};