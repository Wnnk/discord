'use strict';
const Controller = require('egg').Controller;
class EmailController extends Controller {
  async getEmailList() {
    /**
     * @description 获取用户收信件

    **/

    const { ctx } = this;
    ctx.body = await this.service.email.getEmailList();
  }


  async updateEmailStatus() {
    /**
     * @description 阅读信件后选中接受或拒绝
     * @param1 id
     * @param2 type
     */
    const { ctx } = this;
    const id = ctx.request.body.id;
    const type = ctx.request.body.type;
    const friend_uuid = ctx.request.body.sender_uuid;
    const update = ctx.request.body.update;
    ctx.body = await this.service.email.updateEmailStatus(id, type, friend_uuid, update);
  }
}

module.exports = EmailController;
