'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uuid: STRING(20),
    user_name: STRING,
    user_email: STRING,
    user_type: INTEGER(10),
    avator_url: {
      type: STRING,
      defaultValue: 'src/assets/images/avatar.jpg',
    },
    login_num: INTEGER(10),
    create_time: DATE,
    last_login_time: DATE,
    note: STRING,
    /* 0:离线 1:在线 2:空闲 3:忙碌 */
    status: INTEGER(20),
    nickname: STRING(),
  });
  // 表关联的字段
  User.associate = function() {
    app.model.User.hasOne(app.model.UserLogin, { as: 'menu', sourceKey: 'uuid', foreignKey: 'uuid' });
    User.hasMany(app.model.GroupChat, { foreignKey: 'sender_id', targetKey: 'uuid', as: 'userMessage' });
    User.hasOne(app.model.GroupMember, { foreignKey: 'member_id', sourceKey: 'uuid', as: 'memberMessage' });
    User.hasMany(app.model.Post, { as: 'userPost', foreignKey: 'user_id', sourceKey: 'uuid' });
    User.hasMany(app.model.Reply, { as: 'userReply', foreignKey: 'user_id', sourceKey: 'uuid' });
    User.hasMany(app.model.Reply, { foreignKey: 'parent_reply_id', sourceKey: 'uuid' });
    User.hasMany(app.model.Email, { foreignKey: 'sender_uuid', sourceKey: 'uuid' });
    // app.model.User.hasMany(app.model.Message, { as: 'sender', foreignKey: 'sender_uuid' });
    // app.model.User.hasMany(app.model.Message, { as: 'receiver', foreignKey: 'receiver_uuid' });
  };


  return User;
};

