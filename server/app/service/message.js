'use strict';
const Service = require('egg').Service;


class MessageService extends Service {
  async createFriendMessage() {
    const { ctx } = this;
    const data = ctx.request.body;
    const token = ctx.request.header.token;
    const user_uuid = ctx.app.jwt.verify(token, this.config.secret).uuid;
    const flag = await ctx.model.Message.create({
      sender_uuid: user_uuid,
      receiver_uuid: data.uuid,
      contain: data.contain,
      message_type: data.message_type,
    });
    if (flag) {
      return ctx.success('发送成功');
    }
  }

  async createmessagePicture() {
    /* const { ctx } = this;
    const user_uuid = ctx.helper.uuidGet();
    const filePath = `http://127.0.0.1:7001/${ctx.customParam.filename}`;
    try {
      await ctx.model.Message.create({
        sender_uuid: user_uuid,
        receiver_uuid: ctx.customParam.friend_uuid,
        contain: filePath,
        message_type: 1,
      });
    } catch (error) {
      return ctx.fail(error);
    } */

    const { ctx } = this;
    const data = ctx.request.body;
    const user_uuid = ctx.helper.uuidGet();
    const filePath = `http://127.0.0.1:7001/upload/${data.filename}`;
    const flag = await ctx.model.Message.create({
      sender_uuid: user_uuid,
      receiver_uuid: data.friend_uuid,
      contain: filePath,
      message_type: 1,
    });
    if (flag) {
      return ctx.success('成功');
    }
  }
}

module.exports = MessageService;
