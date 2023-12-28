'use strict';
const moment = require('moment');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('group', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      group_name: STRING,
      group_owner: {
        type: STRING(36),
        allowNull: false,
      },
      create_time: {
        type: DATE,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('create_time');
          return rawValue ? rawValue.toISOString().replace(/T/, ' ').replace(/\..+/, '') : null;
        },
        defaultValue: moment(),
      },
      iconpath: {
        type: STRING,
        allowNull: false,
      },
      default_channel: {
        type: STRING(20),
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('group');
  },
};
