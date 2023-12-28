'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('group-channel', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      group_id: {
        type: INTEGER,
        allowNull: false,
      },
      channel_id: {
        type: STRING,
        allowNull: false,
      },
      parvate_channel: {
        type: INTEGER(3),
        allowNull: false,
      }, // 1:私密  2:公开
      channel_name: {
        type: STRING(20),
        allowNull: false,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('group-channel');
  },
};
