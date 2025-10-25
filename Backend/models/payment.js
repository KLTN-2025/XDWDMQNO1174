"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.PC, { foreignKey: "PCID", as: "PC" });
    }
  }
  Payment.init(
    {
      PaymentID: {
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
      PCID: DataTypes.UUID,
      HourStart: DataTypes.DATE,
      NumberHour: DataTypes.INTEGER,
      TotalPrice: DataTypes.INTEGER,
      IsDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "Payments",
      timestamps: true,
    }
  );
  return Payment;
};
