'use strict';
const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Message = app.model.define('message', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    sender_uuid: { type: STRING },
    receiver_uuid: STRING(36),
    contain: STRING,
    create_time: {
      type: DATE,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('create_time');
        return rawValue ? rawValue.toISOString().replace(/T/, ' ').replace(/\..+/, '') : null;
      },
      defaultValue: moment(),
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
  return Message;
};
