'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category_image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      category_icon: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()')
      }
    }),
  down: async (queryInterface, Sequelize) =>
    await queryInterface.dropTable('categories')
};
