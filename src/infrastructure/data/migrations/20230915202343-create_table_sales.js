'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      date: {
        type: Sequelize.DATE
      },
      clientId: {
        type: Sequelize.UUID,
        references: {
          model: 'clients',
          key: 'id'
        },
        allowNull: false
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
      },
      itensSale: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};
