"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PCs", {
      PCID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      ZoneID: {
        type: Sequelize.UUID,
        references: {
          model: "GameZones",
          key: "ZoneID",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      NamePC: {
        type: Sequelize.STRING,
      },
      Deception: {
        type: Sequelize.TEXT,
      },
      PriceHour: {
        type: Sequelize.INTEGER,
      },
      IsBooked: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("PCs");
  },
};
