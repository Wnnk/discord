'use strict';
// const moment = require('moment');

module.exports = {

  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DataTypes, DATE } = Sequelize;
    await queryInterface.createTable('work-book', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: STRING, defaultValue: 'Sheet1' },
      owner: { type: STRING, allowNull: false },
      option: { type: DataTypes.JSON },
      create_time: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
          const rawValue = this.getDataValue('create_time');
          return rawValue ? rawValue.toISOString().replace(/T/, ' ').replace(/\..+/, '') : null;
        },
      },
      update_time: {
        type: DATE,
        allowNull: true,
        get() {
          const rawValue = this.getDataValue('update_time');
          return rawValue ? rawValue.toISOString().replace(/T/, ' ').replace(/\..+/, '') : null;
        },
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('work-book');
  },
};
