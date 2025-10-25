"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      PaymentID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      // FK tới Users (1 - N)
      UserID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "UserId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      // FK tới PCs (1 - 1)
      PCID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "PCs",
          key: "PCID",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      HourStart: {
        type: Sequelize.DATE,
      },
      NumberHour: {
        type: Sequelize.INTEGER,
      },
      TotalPrice: {
        type: Sequelize.INTEGER,
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

    // ✅ Ràng buộc UNIQUE để PC chỉ có 1 payment tại 1 thời điểm → quan hệ 1-1
    await queryInterface.addConstraint("Payments", {
      fields: ["PCID"],
      type: "unique",
      name: "unique_payment_pcid_constraint",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Payments");
  },
};
