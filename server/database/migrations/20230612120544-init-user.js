'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 user 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      uuid: STRING(36),
      user_email: STRING,
      user_name: STRING,
      user_type: INTEGER(10),
      avator_url: {
        type: STRING,
        defaultValue: 'src/assets/images/avatar.jpg',
      },
      login_num: INTEGER(10),
      create_time: DATE,
      last_login_time: DATE,
      note: STRING,
      status: INTEGER(20),
      nickname: STRING(),
    });
  },
  // 在执行数据库降级时调用的函数，删除 user 表
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
