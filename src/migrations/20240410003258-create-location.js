'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'locations',
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
          latitude: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          longitude: {
            type: Sequelize.STRING,
            allowNull: false,
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
      await queryInterface.dropTable('locations', transaction);
    });
  },
};
