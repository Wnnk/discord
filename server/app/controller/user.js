'use strict';
/**
 * @Controller
**/
const JSEncrypt = require('node-jsencrypt');
const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 鉴权回调
  async loginCallBack() {
    /**
    * @summary 鉴权回调
    * @description 鉴权回调接口
    */
    const { ctx } = this;
    ctx.body = await this.service.user.loginCallBack();
  }
  // 注册
  async register() {
    /**
    * @summary 注册
    * @description 注册接口

    */
    const { ctx } = this;
    ctx.body = await this.service.user.register();
  }
  // 登录
  async login() {
    /**
    * @summary 登录
    * @description 登录接口
    */
    const { ctx } = this;
    ctx.body = await this.service.user.login();
  }
  // 退出登录
  async logout() {
    /**
    * @summary 退出登录
    * @description 退出登录接口
    */
    const { ctx } = this;
    ctx.body = await this.service.user.logout();
  }

  // 查询用户好友列表
  async friend() {
    /**
    * @summary 查询用户好友
    * @description 查询好友接口
    */
    const { ctx } = this;
    ctx.body = await this.service.user.friend();

  }
  /**
   * @description 好友模糊搜索
   *
   */
  async search() {
    const { ctx } = this;
    ctx.body = await this.service.user.search();
  }

  /**
   * @description 用户更新自身信息
  **/
  async changeInfo() {
    const { ctx } = this;
    ctx.body = await this.service.user.changeInfo();
  }

  /**
   * @description stmp发送邮箱验证码
   */
  async captcha() {
    const { ctx } = this;
    ctx.body = await this.service.user.captcha();
  }

  /**
   * @description 密码修改
   */
  async changePassword() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    // // 设置私钥
    const prvKey = this.app.config.private_key;
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPrivateKey(prvKey);

    try {
      const { oldPassword, newPassword, confirmPassword } = JSON.parse(jsencrypt.decrypt(data));
      ctx.body = await this.service.user.changePassword(oldPassword, newPassword, confirmPassword);
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        msg: '参数错误',
      };
    }
  }


  async test() {
    const { ctx } = this;
    ctx.body = await this.service.user.test();
  }
}

module.exports = LoginController;
