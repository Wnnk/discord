'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, DataTypes } = Sequelize;
    await queryInterface.createTable('post', {
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
  },

  down: async queryInterface => {
    await queryInterface.dropTable('post');
  },
};
