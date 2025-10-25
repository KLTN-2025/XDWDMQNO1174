"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // 1 User có nhiều JwtToken
      User.hasMany(models.JwtToken, {
        foreignKey: "UserId",
        as: "Tokens",
      });
      //1-n Với Notifications
      User.hasMany(models.Notification, {
        foreignKey: "UserID",
        as: "Notifications",
      });
      //1-n với VerifyCode
      User.hasMany(models.VerifyCode, {
        foreignKey: "UserID",
        as: "VerifyCodes",
      });
      //1-n với Messenger SendID và ReciveID
      User.hasMany(models.Messenger, {
        foreignKey: "SendID",
        as: "SendMessengers",
      });
      User.hasMany(models.Messenger, {
        foreignKey: "ReceiveID",
        as: "ReciverMessengers",
      });
    }
  }

  User.init(
    {
      UserId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      Name: DataTypes.STRING,
      PhoneNumber: DataTypes.STRING,
      Email: DataTypes.STRING,
      Password: DataTypes.STRING,
      Role: DataTypes.STRING,
      IsDelete: DataTypes.BOOLEAN,
      Verify: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
    }
  );

  return User;
};
