'use strict';

const { Service } = require('egg');
class GuildChatService extends Service {


  /* 社区聊天信息 */
  async getChatList() {
    const { ctx } = this;
    const channel_id = ctx.request.body.channel_id;
    const User = ctx.model.User;
    const GroupChat = ctx.model.GroupChat;


    const result = await GroupChat.findAll({
      where: {
        channel_id,
      },
      include: {
        model: User,
        as: 'userInfo',
        attributes: [ 'user_name', 'avator_url' ],
      },
      order: [[ 'create_time', 'ASC' ]],
    });

    return ctx.success({ result });
  }

  /* 社区人员状态 */
  async getMemberStatus() {
    const { ctx } = this;
    const group_id = ctx.request.body.group_id;
    const result = await ctx.model.GroupMember.findAll({
      where: {
        group_id,
      },
      include: {
        model: ctx.model.User,
        as: 'memberInfo',
        attributes: [ 'user_name', 'avator_url', 'uuid', 'create_time', 'last_login_time', 'status' ],
      },
    });
    if (result) {
      return ctx.success('查询社区成员成功', { result });
    }
  }

  /* 发送信息接口 */
  async Chat() {
    const { ctx } = this;
    const { message_type, message, channel_id, group_id } = ctx.request.body;
    const sender_id = ctx.helper.uuidGet();
    const result = await ctx.model.GroupChat.create({
      sender_id,
      message_type,
      message,
      channel_id,
      group_id,
    });
    if (result) {
      return ctx.success('发送成功');
    }
    return ctx.warn('发送失败');
  }

  /* 发送图片接口 */
  async Picture(data) {
    const { ctx } = this;
    const sender_id = ctx.helper.uuidGet();
    const filePath = `http://127.0.0.1:7001/guildChat/${data.filename}`;
    const result = await ctx.model.GroupChat.create({
      sender_id,
      message: filePath,
      message_type: data.message_type,
      channel_id: data.channel_id,
      group_id: data.group_id,
    });
    if (result) {
      return ctx.success('发送图片成功');
    }
    return ctx.warn('发送图片失败');
  }

}

module.exports = GuildChatService;
