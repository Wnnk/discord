'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 user_login 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('user_login', {
      uuid: { type: STRING(36), primaryKey: true },
      user_password: STRING,
      user_email: STRING,
      salt: STRING,
      status: INTEGER(20),
    });
  },
  // 在执行数据库降级时调用的函数，删除 user_login 表
  down: async queryInterface => {
    await queryInterface.dropTable('user_login');
  },
};
