"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "Verify", {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // tuỳ bạn muốn mặc định thế nào
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "Verify");
  },
};
