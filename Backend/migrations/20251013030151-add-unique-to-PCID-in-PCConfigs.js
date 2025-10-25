"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // ✅ Thêm ràng buộc UNIQUE cho cột PCID
    await queryInterface.addConstraint("PCConfigs", {
      fields: ["PCID"],
      type: "unique",
      name: "unique_pcconfig_pcid_constraint", // tên ràng buộc (tuỳ bạn đặt)
    });
  },

  async down(queryInterface, Sequelize) {
    // 🔁 Xóa ràng buộc nếu rollback
    await queryInterface.removeConstraint(
      "PCConfigs",
      "unique_pcconfig_pcid_constraint"
    );
  },
};
