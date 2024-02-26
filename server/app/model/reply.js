'use strict';
// const moment = require('moment');
module.exports = app => {
  const { DATE, DataTypes, STRING } = app.Sequelize;

  const Reply = app.model.define('reply', {
    id: {
      type: STRING(20),
      primaryKey: true,
    },
    content: STRING,
    create_time: DATE,
    update_time: DATE,
    user_id: STRING(20),
    post_id: STRING(20),
    parent_reply_id: STRING(20),
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Reply.associate = function() {
    Reply.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'uuid', as: 'replyList' });
    Reply.belongsTo(app.model.User, { foreignKey: 'parent_reply_id', targetKey: 'uuid', as: 'parentReply' });
  };
  return Reply;
};
