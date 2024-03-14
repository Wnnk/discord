'use strict';
const Service = require('egg').Service;
const { Op } = require('sequelize');


class InformationService extends Service {
  /* 个人公开信息获取 */
  async public() {
    const { ctx } = this;
    const uuid = ctx.request.body.uuid;
    const token = ctx.request.header.token;
    const user_uuid = ctx.app.jwt.verify(token, this.config.secret).uuid;
    const information = await ctx.model.User.findOne({
      where: { uuid },
      attributes: [ 'user_name', 'avator_url', 'create_time', 'note', 'status', 'uuid', 'last_login_time' ],
    });

    const message = await ctx.model.Message.findAll({
      where: {
        [Op.or]: [
          {
            sender_uuid: user_uuid,
            receiver_uuid: uuid,
          },
          {
            sender_uuid: uuid,
            receiver_uuid: user_uuid,
          },
        ],
      },
      order: [[ 'create_time', 'ASC' ]],
    });

    if (information) {
      return ctx.success('查询成功', { information, message });
    }
  }

  /* 改变好友关系 */
  async relationship() {
    const { ctx } = this;
    const user_uuid = ctx.helper.uuidGet();
    const data = ctx.request.body;
    const flag = await ctx.model.Friend.update({ relationship: data.relationship }, {
      where: {
        user_uuid,
        friend_uuid: data.friend_uuid,
      },
    });
    if (flag) {
      return ctx.success('改变好友关系成功');
    }
  }

  async addFriendMethod(friend_uuid, uuid) {
    const { ctx } = this;
    const [ friend, created ] = await ctx.model.Friend.findOrCreate({
      where: {
        friend_uuid,
        user_uuid: uuid,
      },
      defaults: {
        user_uuid: uuid,
        friend_uuid,
        relationship: 0,
      },
    });
    const [ other, createOther ] = await ctx.model.Friend.findOrCreate({
      where: {
        friend_uuid: uuid,
        user_uuid: friend_uuid,
      },
      defaults: {
        user_uuid: friend_uuid,
        friend_uuid: uuid,
        relationship: 0,
      },
    });
    if (created && createOther) {
      const flag = await ctx.service.email.sendEmail(uuid, friend_uuid, '邀请好友', 'title', 0);
      if (flag) {
        return '请求已发送';
      }
    } else if (friend && other) {
      return '请求申请中';
    }
    throw new Error('请求未发送成功');
  }

  async addFriend() {
    const { ctx } = this;
    const form = ctx.request.body;
    const uuid = ctx.helper.uuidGet();
    try {
      if (!form.friend_uuid) {
        /* 仅有用户名字 */
        const friend_uuid = await ctx.model.User.findOne({
          where: {
            user_name: form.friend_name,
          },
        });
        /* 补充查询到的uuid */
        form.friend_uuid = friend_uuid.dataValues.uuid;
        const msg = await this.addFriendMethod(form.friend_uuid, uuid);
        return ctx.success(msg);
      }
      /* 直接根据uuid查询 */
      const msg = await this.addFriendMethod(form.friend_uuid, uuid);
      return ctx.success(msg);
    } catch (error) {
      return ctx.fail(`${error}`);
    }
  }
}

module.exports = InformationService;
