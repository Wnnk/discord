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
}

module.exports = InformationService;
