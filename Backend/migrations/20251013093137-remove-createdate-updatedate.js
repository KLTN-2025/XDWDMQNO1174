"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 🗑 Xóa cột CreateDate và UpdateDate ở từng bảng
    await queryInterface.removeColumn("Users", "CreateDate");
    await queryInterface.removeColumn("Users", "UpdateDate");

    await queryInterface.removeColumn("JwtTokens", "CreateDate");

    await queryInterface.removeColumn("Messengers", "CreateAt");
    await queryInterface.removeColumn("Messengers", "UpdateAt");

    await queryInterface.removeColumn("Notifications", "CreateAt");

    await queryInterface.removeColumn("News", "CreateAt");
    await queryInterface.removeColumn("News", "UpdateAt");
  },

  async down(queryInterface, Sequelize) {
    // 🧩 Nếu rollback, thêm lại các cột đó
    await queryInterface.addColumn("Users", "CreateDate", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    });
    await queryInterface.addColumn("Users", "UpdateDate", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    });

    // 👉 Tương tự thêm lại cho các bảng khác nếu cần
  },
};
