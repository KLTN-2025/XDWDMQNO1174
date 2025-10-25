"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Messengers", {
      MessID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      SendID: {
        type: Sequelize.UUID,
        //Thêm quan hệ
        references: {
          model: "Users", // tên bảng cha
          key: "UserId", // cột khóa chính trong bảng Users
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // xóa user => token bị xóa theo
      },
      ReceiveID: {
        type: Sequelize.UUID,
        //Thêm quan hệ
        references: {
          model: "Users", // tên bảng cha
          key: "UserId", // cột khóa chính trong bảng Users
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // xóa user => token bị xóa theo
      },
      Content: {
        type: Sequelize.STRING,
      },
      URL_Img: {
        type: Sequelize.STRING,
      },
      CreateAt: {
        type: Sequelize.DATE,
      },
      UpdateAt: {
        type: Sequelize.DATE,
      },
      IsDelete: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Messengers");
  },
};
