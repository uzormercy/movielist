'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'characters',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            type: Sequelize.UUID,
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'first_name',
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'last_name',
          },
          gender: {
            type: Sequelize.ENUM(['MALE', 'FEMALE']),
            allowNull: false,
          },
          status: {
            type: Sequelize.ENUM(['ACTIVE', 'DEAD', 'INACTIVE', 'UNKNOWN']),
            allowNull: false,
            defaultValue: 'UNKNOWN',
          },
          stateOfOrigin: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'state_of_origin',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'created_at',
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'updated_at',
          },
        },
        { transaction },
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('characters', transaction);
    });
  },
};
