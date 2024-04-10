'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'comments',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            type: Sequelize.UUID,
          },
          comment: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          ipAddressLocation: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'ip_address_location',
          },
          episodeId: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            type: Sequelize.UUID,
            field: 'episode_id',
            references: { model: 'episodes', key: 'id' },
            onDelete: 'cascade',
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
      await queryInterface.dropTable('comments', transaction);
    });
  },
};
