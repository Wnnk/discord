'use strict';
const Sequelize = require('sequelize');
const { Service } = require('egg');
class GuildService extends Service {
  async getguildList() {
    const { ctx } = this;
    let tag = ctx.request.body.tag;
    if (!tag) {
      tag = 'default';
    }

    const guildNumber = await ctx.model.GroupMember.findAll({
      attributes: [ 'group_id', [ Sequelize.fn('COUNT', 'group_id'), 'count' ]],
      group: [ 'group_id' ],
    });
    const groups = [];
    for (let i = 0; i < guildNumber.length; i++) {
      const count = guildNumber[i];

      const groupId = count.dataValues.group_id;

      const countValue = count.dataValues.count;
      /* 根据社区id逐个查询 */
      const group = await ctx.model.Group.findOne({
        where: {
          id: groupId,
        },
      });

      if (group) {
        groups.push({ group, count: countValue });
      }
    }

    if (groups.length === 0) {
      return ctx.fail('查询没有社区返回');
    }
    return ctx.success('查询热门社区', groups);


  }
}

module.exports = GuildService;
