"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PCConfigs", {
      ConfigID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      PCID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "PCs",
          key: "PCID",
        },
        onDelete: "CASCADE", // Xóa PC thì xóa luôn config
      },
      Monitor: {
        type: Sequelize.STRING,
      },
      Ram: {
        type: Sequelize.STRING,
      },
      SSD: {
        type: Sequelize.STRING,
      },
      CPU: {
        type: Sequelize.STRING,
      },
      GPU: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("PCConfigs");
  },
};
