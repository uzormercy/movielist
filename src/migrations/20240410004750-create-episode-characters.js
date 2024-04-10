'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'episode_characters',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            type: Sequelize.UUID,
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
          characterId: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            type: Sequelize.UUID,
            field: 'character_id',
            references: { model: 'characters', key: 'id' },
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
      await queryInterface.dropTable('episode_characters', transaction);
    });
  },
};
