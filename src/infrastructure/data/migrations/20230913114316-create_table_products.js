'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      productStock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: true
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      attributes: {
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
    await queryInterface.dropTable('products')
};
