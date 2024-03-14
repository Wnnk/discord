'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, DATE, INTEGER } = Sequelize;
    await queryInterface.createTable('email-code', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      email: STRING(255),
      code: STRING(10),
      expiration_time: DATE,
      create_time: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('email-code');
  },
};
