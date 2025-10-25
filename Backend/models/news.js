"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {}
  }
  News.init(
    {
      NewsID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      Title: DataTypes.STRING,
      URL_Crawl: DataTypes.STRING,
      Content: DataTypes.STRING,
      URL_IMG: DataTypes.STRING,
      IsDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "New",
      tableName: "News",
      timestamps: true,
    }
  );
  return News;
};
