'use strict';

/**
 * @Controller
**/

const Controller = require('egg').Controller;

class InformationController extends Controller {
  // 获取聊天界面个人信息
  async public() {
    /**
     * @summary 获取个人信息
     * @description 进入聊天界面时获取聊天对象的个人公开信息
     * @router post information/public
     * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.information.public();
  }

  async relationship() {
    /**
     * @summary 删除/屏蔽 好友
     * @description 改变当前好友关系
     * @router post information/relationship
     * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.information.relationship();
  }
}

module.exports = InformationController;
