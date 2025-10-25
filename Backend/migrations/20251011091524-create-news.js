"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("News", {
      NewsID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      Title: {
        type: Sequelize.STRING,
      },
      URL_Crawl: {
        type: Sequelize.STRING,
      },
      Content: {
        type: Sequelize.TEXT,
      },
      URL_IMG: {
        type: Sequelize.STRING,
      },
      IsDelete: {
        type: Sequelize.BOOLEAN,
      },
      CreateAt: {
        type: Sequelize.DATE,
      },
      UpdateAt: {
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
    await queryInterface.dropTable("News");
  },
};
