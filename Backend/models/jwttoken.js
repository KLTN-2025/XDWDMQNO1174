"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class JwtToken extends Model {
    static associate(models) {
      // Nhiều JwtToken thuộc về 1 User
      JwtToken.belongsTo(models.User, {
        foreignKey: "UserID",
        as: "User",
      });
    }
  }

  JwtToken.init(
    {
      JwtId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "UserID", // map đúng tên cột trong DB
      },
      Code: DataTypes.TEXT,
      IsUse: DataTypes.BOOLEAN,
      ExpirationDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "JwtToken",
      tableName: "JwtTokens",
      timestamps: true,
    }
  );

  return JwtToken;
};
