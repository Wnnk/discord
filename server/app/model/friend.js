'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Friend = app.model.define('friend', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    user_uuid: { type: STRING },
    friend_uuid: STRING,
    /* 关系为相互储存 */
    /* 0:待定(已经发送好友申请 / 删除好友关系) 1:确定好友 -1:已经屏蔽 */
    relationship: INTEGER(3),
  });
  Friend.associate = function() {
  };

  return Friend;
};
