"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PC extends Model {
    static associate(models) {
      //Quan hệ 1-n với bảng gamezones
      PC.belongsTo(models.GameZone, {
        foreignKey: "ZoneID",
        as: "GameZone",
      });
      PC.hasOne(models.Payment, { foreignKey: "PCID", as: "Payment" });
    }
  }
  PC.init(
    {
      PCID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      ZoneID: DataTypes.UUID,
      NamePC: DataTypes.STRING,
      Deception: DataTypes.TEXT,
      PriceHour: DataTypes.INTEGER,
      IsBooked: DataTypes.BOOLEAN,
      IsDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "PC",
      tableName: "PCs",
      timestamps: true,
    }
  );
  return PC;
};
