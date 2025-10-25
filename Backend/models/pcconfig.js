"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PCConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PCConfig.init(
    {
      PCID: DataTypes.UUID,
      Monitor: DataTypes.STRING,
      Ram: DataTypes.STRING,
      SSD: DataTypes.STRING,
      CPU: DataTypes.STRING,
      GPU: DataTypes.STRING,
      IsDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "PCConfig",
      tableName: "PCConfigs",
      timestamps: true,
    }
  );
  return PCConfig;
};
