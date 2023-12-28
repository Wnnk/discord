'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('message', {
      id: { type: INTEGER, autoIncrement: true },
      sender_uuid: { type: STRING, primaryKey: true },
      receiver_uuid: STRING(36),
      content: STRING,
      create_time: {
        type: DATE,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('create_time');
          return rawValue ? rawValue.toISOString().replace(/T/, ' ').replace(/\..+/, '') : null;
        },
        defaultValue: Date.now(),
      },
      /* 0:已发送未阅读，1：已发送已阅读， -1:发送失败(已被屏蔽或网络错误) */
      read: {
        type: INTEGER,
        defaultValue: 0,
      },
      /* 0: 未被删除, 1:已经删除 */
      is_deleted: {
        type: INTEGER(3),
        defaultValue: 0,
      },
      /* 附件url */
      attachment: STRING,
      /* 0:文本, 1:图片 2:音频 */
      message_type: INTEGER(3),
    });
  },

  // 在执行数据库降级时调用的函数，删除 user 表
  down: async queryInterface => {
    await queryInterface.dropTable('message');
  },
};
