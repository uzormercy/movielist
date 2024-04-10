'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'episodes',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            type: Sequelize.UUID,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          releaseDate: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'release_date',
          },
          code: {
            type: Sequelize.STRING,
            allowNull: false,
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
      await queryInterface.dropTable('episodes', transaction);
    });
  },
};
