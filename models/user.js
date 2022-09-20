'use strict';
const { isAfter } = require('date-fns');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName:{ 
      type: DataTypes.STRING(64),
      field:'first_name',
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    lastName: { 
      type: DataTypes.STRING(64),
      field:'last_name',
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true,
      }
    },
    password: {
      type:DataTypes.TEXT,
      field:'password_hash',
      allowNull: false,
    },
    birthday: {
      type:DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isValid(value) {
          if (isAfter(new Date(value),new Date()) ) {
            throw new Error('Check yr bday!');
          }
        }
      }
    },
    isMale:{
      type: DataTypes.BOOLEAN,
      field:'is_male',
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users',
    underscored: true
  });
  return User;
};