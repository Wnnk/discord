'use strict';
// const moment = require('moment');

module.exports = {

  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, DataTypes } = Sequelize;
    await queryInterface.createTable('sheet', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      workbook_id: { type: INTEGER, allowNull: false },
      option: { type: DataTypes.JSON },
      create_time: {
        type: DATE,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('create_time');
          return rawValue ? rawValue.toISOString().replace(/T/, ' ').replace(/\..+/, '') : null;
        },
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
    await queryInterface.dropTable('sheet');
  },
};
