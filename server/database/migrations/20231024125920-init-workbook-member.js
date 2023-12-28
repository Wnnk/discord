'use strict';


module.exports = {

  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('workbook-member', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      workbook_id: { type: INTEGER, allowNull: false },
      uuid: { type: STRING },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('workbook-member');
  },
};

