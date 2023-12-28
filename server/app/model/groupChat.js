'use strict';
const moment = require('moment');
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const GroupChat = app.model.define('group-chat', {
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

  GroupChat.associate = function() {
    GroupChat.belongsTo(app.model.User, { foreignKey: 'sender_id', targetKey: 'uuid', as: 'userInfo' });
  };

  return GroupChat;
};
