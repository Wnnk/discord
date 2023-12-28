'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('group-member', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      group_id: INTEGER,
      member_id: STRING(36),
      type: INTEGER(10),
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('group-member');
  },
};
