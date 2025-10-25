"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  //Bật extendtion UUID của postgress SQL (chạy 1 lần sẽ không chạy lần nữa)
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );

    await queryInterface.createTable("Users", {
      UserId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING,
      },
      PhoneNumber: {
        type: Sequelize.STRING,
      },
      Email: {
        type: Sequelize.STRING,
      },
      Password: {
        type: Sequelize.STRING,
      },
      Role: {
        type: Sequelize.STRING,
      },
      IsDelete: {
        type: Sequelize.BOOLEAN,
      },
      CreateDate: {
        type: Sequelize.DATE,
      },
      UpdateDate: {
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
    await queryInterface.dropTable("Users");
  },
};
