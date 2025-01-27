"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("quotes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      service_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      service_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currency_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currency_symbol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currency_exponent: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      estimated_pickup: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estimated_dropoff: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      distance: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      origin_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      origin_city_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      origin_latitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      origin_longitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      destination_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination_city_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination_latitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      destination_longitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("quotes");
  },
};
