"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VerifyCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Nhiều JwtToken thuộc về 1 User
      VerifyCode.belongsTo(models.User, {
        foreignKey: "UserID",
        as: "User",
      });
    }
  }
  VerifyCode.init(
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      UserID: DataTypes.UUID,
      Code: DataTypes.STRING,
      IsUse: DataTypes.BOOLEAN,
      ExpirationDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "VerifyCode",
      tableName: "VerifyCodes",
      timestamps: true,
    }
  );
  return VerifyCode;
};
