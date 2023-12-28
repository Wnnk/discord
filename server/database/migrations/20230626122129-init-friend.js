'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('friend', {
      id: { type: INTEGER, autoIncrement: true },
      user_uuid: { type: STRING, primaryKey: true },
      friend_uuid: STRING,
      relationship: INTEGER(3),
    });
  },

  // 在执行数据库降级时调用的函数，删除 user 表
  down: async queryInterface => {
    await queryInterface.dropTable('friend');
  },
};
