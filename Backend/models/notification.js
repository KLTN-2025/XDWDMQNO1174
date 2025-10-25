"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // tạo quan hệ với bảng Users
      Notification.belongsTo(models.User, {
        foreignKey: "UserID",
        as: "User",
      });
    }
  }
  Notification.init(
    {
      NotifiID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Sequelize tự sinh UUID khi create
        allowNull: false,
        primaryKey: true,
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "UserID", // map đúng tên cột trong DB
      },
      TitleNotify: DataTypes.STRING,
      Content: DataTypes.STRING,
      URL_Notify: DataTypes.STRING,
      IsDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "Notifications",
      timestamps: true,
    }
  );
  return Notification;
};
