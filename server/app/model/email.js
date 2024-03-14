'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Email = app.model.define('email', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    receiver_uuid: STRING(32),
    sender_uuid: STRING(32),
    status: INTEGER, /* 0:未读 1:已读 */
    content: STRING(255),
    title: STRING(255),
    type: INTEGER, /* 0:好友申请 1:私人信件 2:群发信件 */
    create_time: DATE,
  });
  Email.associate = function() {
    Email.belongsTo(app.model.User, { foreignKey: 'sender_uuid', targetKey: 'uuid', as: 'ReceiverList' });
  };

  return Email;
};
