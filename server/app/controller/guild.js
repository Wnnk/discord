const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

class GuildController extends Controller {
  async createGuild() {
  /**
  * @summary 创建群
  * @description 创建接口
  * @router post /guild/create
  * @Request  token , picture , guild_name
  * @response 200 JsonResult 操作结果
  */
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
    const target = path.join('app/public/guild', filename);
    // 写入文件
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    const server_name = stream.fields.server_name;
    ctx.body = await this.service.guild.createGuild(server_name, filename);
  }

  async getList() {
  /**
  * @summary 查询社区列表
  * @description 查询用户所在社区接口
  * @router post /guild/getlist
  * @Request  token
  * @response 200 JsonResult 操作结果
  */
    const { ctx } = this;
    ctx.body = await this.service.guild.getList();

  }

  async getChatList() {
    /**
    * @summary 查询社区聊天列表
    * @description 查询用户所在社区聊天历史记录
    * @router post /guild/chatlist
    * @Request  token
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.guildChat.getChatList();

  }

  async getChannelList() {
    /**
    * @summary 查询社区频道侧边栏
    * @description 查询用户所在社区频道
    * @router post /guild/chatlist
    * @Request  token
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.guild.getChannelList();

  }

  async getMemberStatus() {
    /**
    * @summary 查询社区右侧的成员列表
    * @description 查询用户所在社区成员
    * @router post /guild/memberstatus
    * @Request  token
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.guildChat.getMemberStatus();
  }

  async getChannelTitle() {
    /**
    * @summary 查询社区频道名字
    * @description 查询用户所在社区名字
    * @router post /guild/title
    * @Request  token
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.guild.getChannelTitle();
  }

  async Chat() {
    /**
    * @summary 用户发送社区信息
    * @description 用户发送社区信息
    * @router post /guild/chat
    * @Request  token
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.guildChat.Chat();
  }

  async Picture() {
    /**
    * @summary 用户发送社区图片
    * @description 用户发送社区图片信息
    * @router post /guild/picture
    * @Request  token
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    const data = ctx.GuildUpload;
    ctx.body = await this.service.guildChat.Picture(data);
  }

}

module.exports = GuildController;
