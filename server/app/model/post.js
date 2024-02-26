'use strict';
// const moment = require('moment');
module.exports = app => {
  const { INTEGER, DATE, DataTypes, STRING } = app.Sequelize;

  const Post = app.model.define('post', {
    id: {
      type: STRING(20),
      primaryKey: true,
    },
    title: STRING(50),
    content: STRING,
    create_time: DATE,
    update_time: DATE,
    user_id: STRING(20),
    category_id: INTEGER,
    view_count: INTEGER,
    reply_count: INTEGER,
    last_reply_user_id: INTEGER,
    last_reply_time: DATE,
    is_top: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Post.associate = function() {
    Post.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'uuid', as: 'PostList' });
  };

  return Post;
};
