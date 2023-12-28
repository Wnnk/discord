'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('group-chat', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      group_id: INTEGER,
      sender_id: STRING(36),
      message: STRING,
      create_time: {
        type: DATE,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('create_time');
          return rawValue ? rawValue.toISOString().replace(/T/, ' ').replace(/\..+/, '') : null;
        },
        defaultValue: moment(),
      },
      channel_id: STRING,
      message_type: INTEGER,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('group-chat');
  },
};
