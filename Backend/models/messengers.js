"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messengers extends Model {
    static associate(models) {
      Messengers.belongsTo(models.User, {
        foreignKey: "SendID",
        as: "Sender",
      });
      Messengers.belongsTo(models.User, {
        foreignKey: "ReceiveID",
        as: "Reciver",
      });
    }
  }
  Messengers.init(
    {
      MessID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Sequelize tự sinh UUID khi create
        allowNull: false,
        primaryKey: true,
      },
      SendID: DataTypes.UUID,
      ReceiveID: DataTypes.UUID,
      Content: DataTypes.STRING,
      URL_Img: DataTypes.STRING,
      IsDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Messenger",
      tableName: "Messengers",
      timestamps: true,
    }
  );
  return Messengers;
};
