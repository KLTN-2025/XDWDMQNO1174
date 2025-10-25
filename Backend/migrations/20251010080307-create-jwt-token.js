"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("JwtTokens", {
      JwtId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      UserID: {
        type: Sequelize.UUID,
        allowNull: false,
        //Thêm quan hệ
        references: {
          model: "Users", // tên bảng cha
          key: "UserId", // cột khóa chính trong bảng Users
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // xóa user => token bị xóa theo
      },
      Code: {
        type: Sequelize.TEXT,
      },
      IsUse: {
        type: Sequelize.BOOLEAN,
      },
      CreateDate: {
        type: Sequelize.DATE,
      },
      ExpirationDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("JwtTokens");
  },
};
