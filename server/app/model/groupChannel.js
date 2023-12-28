'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  const GroupChannel = app.model.define('group-channel', {
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

  return GroupChannel;
};
