'use strict';

const { Service } = require('egg');
class GuildService extends Service {
  /* 创建社区 */
  async createGuild(server_name, filename) {
    const { ctx } = this;
    const path = `http://127.0.0.1:7001/guild/${filename}`;
    const user_uuid = ctx.helper.uuidGet();
    const flag = await ctx.model.Group.create({
      group_name: server_name,
      group_owner: user_uuid, /* 错误 成员也应该显示 */
      iconpath: path,
    });
    if (flag) {
      /* 创建默认成员 */
      const member = this.addGuildMember(flag.dataValues.id, user_uuid, 1);
      /* 创建默认频道 */
      const channel = this.addGuildChannel(flag.dataValues.id, 0, '常规');
      if (member && channel) {
        return ctx.success('创建成功');
      }
    }
    return ctx.fail('创建失败');
  }
  /* 返回社区列表 */
  async getList() {
    const { ctx } = this;
    const user_uuid = ctx.helper.uuidGet();
    const user_guilds = await ctx.model.GroupMember.findAll({
      where: { member_id: user_uuid },
    });
    /* 用户所在的社区ID */
    const guilds_id = user_guilds.map(item => item.group_id);

    const flag = await ctx.model.Group.findAll({
      where: { id: guilds_id },
    });
    if (flag) {
      return ctx.success('查询成功', { flag });
    }
    return ctx.fail('查询失败');
  }
  /* 添加社区成员 */
  async addGuildMember(group_id, member_id, type) {
    const { ctx } = this;
    /* 检验此人是否存在 */
    const member = await ctx.model.User.findOne({
      uuid: member_id,
    });
    if (member) {
      const flag = await ctx.model.GroupMember.create({
        group_id,
        member_id,
        type,
      });
      if (flag) {
        return ctx.success('创建频道成功');
      }
      return ctx.fail('创建频道失败');
    }
    return ctx.fail('此人不存在');
  }
  /* 新增社区频道 */
  async addGuildChannel(group_id, parvate_channel, channel_name) {
    const { ctx } = this;
    /* 检验该社区是否存在 */
    const group = await ctx.model.Group.findOne({
      where: {
        id: group_id,
      },
    });
    const channel_id = ctx.helper.uuidSet();

    /* 主动添加新频道 */
    if (group) {
      const flag = await ctx.model.GroupChannel.create({
        group_id,
        channel_id,
        parvate_channel,
        channel_name,
      });
      /* 创建社区自动添加默认频道 */
      if (group.dataValues.default_channel === null) {
        await ctx.model.Group.update({
          default_channel: channel_id,
        }, {
          where: { id: group_id },
        });
      }
      if (flag) {
        return ctx.success('创建频道成功');
      }
      return ctx.fail('创建频道失败');
    }
    return ctx.fail('此社区不存在');
  }

  /* 返回社区的频道 */
  async getChannelList() {
    const { ctx } = this;
    const group_id = ctx.request.body.group_id;
    const channel = await ctx.model.GroupChannel.findAll({
      where: {
        group_id,
      },
    });
    const group = await ctx.model.Group.findOne({
      where: { id: group_id },
    });
    if (channel && group) {
      return ctx.success('查询成功', { channel, group });
    }
  }

  /* 返回社区频道名字 */
  async getChannelTitle() {
    const { ctx } = this;
    const channel_id = ctx.request.body.channel_id;
    const channel = await ctx.model.GroupChannel.findOne({
      where: { channel_id },
      attributes: { exclude: [ 'id' ] },
    });
    if (channel) {
      return ctx.success('查询成功', { channel });
    }
  }


}

module.exports = GuildService;
