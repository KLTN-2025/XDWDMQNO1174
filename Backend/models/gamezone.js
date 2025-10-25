"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameZone extends Model {
    static associate(models) {
      //Cần phải có để định nghĩa quan hệ
      //1-n với PCS
      GameZone.hasMany(models.PC, {
        foreignKey: "ZoneID",
        as: "PC",
      });
    }
  }
  GameZone.init(
    {
      ZoneID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      ZoneTitle: DataTypes.STRING,
      IsDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "GameZone",
      tableName: "GameZones",
      timestamps: true,
    }
  );
  return GameZone;
};
