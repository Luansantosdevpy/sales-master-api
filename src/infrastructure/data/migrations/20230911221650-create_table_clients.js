'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.createTable('clients', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postal_code: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address_number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    complement: {
      type: Sequelize.STRING,
      allowNull: true
    },
    province: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    uf: {
      type: Sequelize.STRING,
      allowNull: false
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
  down: async (queryInterface, Sequelize) => await queryInterface.dropTable('clients')
};
