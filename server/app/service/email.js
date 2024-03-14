'use strict';

const { Service } = require('egg');
class EmailService extends Service {
  async sendEmail(sender_uuid, receiver_uuid, content, title, type) {
    const { ctx } = this;
    const params = {
      sender_uuid,
      receiver_uuid,
      content,
      title,
      type,
      status: 0,
      create_time: new Date(),
    };
    try {
      const is_send = await ctx.model.Email.create(params);
      if (is_send) {
        return true;
      }
      return false;
    } catch (error) {
      return `${error}`;
    }
  }

  async getEmailList() {
    const { Sequelize } = require('sequelize');
    const { ctx } = this;
    const uuid = ctx.helper.uuidGet();
    try {
      const emailList = await ctx.model.Email.findAll({
        where: {
          receiver_uuid: uuid,
        },
        include: [
          {
            model: ctx.model.User,
            attributes: [],
            as: 'ReceiverList',
          },
        ],
        raw: true,
        attributes: [
          'receiver_uuid',
          'sender_uuid',
          'status',
          'content',
          'title',
          'type',
          'create_time',
          'id',
          Sequelize.col('user_name'),
          Sequelize.col('avator_url'),
        ],
      });
      return ctx.success('获取信件成功', emailList);
    } catch (error) {
      return ctx.fail(`${error}`);
    }

  }

  async updateEmailStatus(id, type, friend_uuid, update) {
    const { ctx } = this;
    const user_uuid = ctx.helper.uuidGet();
    try {
      /* 更新邮件状态 */
      await ctx.model.Email.update({
        status: 1,
      }, {
        where: {
          id,
        },
      });
      /* 邮件是否为好友申请 */
      if (type === 0) {
        await ctx.model.Friend.update({ relationship: update }, {
          where: {
            user_uuid,
            friend_uuid,
          },
        });
        await ctx.model.Friend.update({ relationship: update }, {
          where: {
            user_uuid: friend_uuid,
            friend_uuid: user_uuid,
          },
        });
      }
      return ctx.success('更新邮件状态成功');
    } catch (error) {
      return ctx.fail(`${error}`);
    }
  }
}

module.exports = EmailService;
