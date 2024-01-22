'use strict';

/**
 * @Controller
**/

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 鉴权回调
  async loginCallBack() {
    /**
    * @summary 鉴权回调
    * @description 鉴权回调接口
    * @router post /login/callback
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.user.loginCallBack();
  }
  // 注册
  async register() {
    /**
    * @summary 注册
    * @description 注册接口
    * @router post /user/register
    * @request body user_register 配置请求携带参数
    * @Request header string token eg：write your token at here
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.user.register();
  }
  // 登录
  async login() {
    /**
    * @summary 登录
    * @description 登录接口
    * @router post /user/login
    * @request body user_login 配置请求携带参数
    * @Request header string token eg：write your token at here
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.user.login();
  }
  // 退出登录
  async logout() {
    /**
    * @summary 退出登录
    * @description 退出登录接口
    * @router post /user/logout
    * @Request header string token eg：write your token at here
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.user.logout();
  }

  // 查询用户好友列表
  async friend() {
    /**
    * @summary 查询用户好友
    * @description 查询好友接口
    * @router post /user/friend
    * @Request  header string token eg：write your token at here
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.user.friend();

  }
  /**
   * @description 好友模糊搜索
   * @router post /user/search
   * 
   */
  async search() {
    const { ctx } = this;
    ctx.body = await this.service.user.search();
  }
}

module.exports = LoginController;
