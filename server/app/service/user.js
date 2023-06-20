'use strict';

const Service = require('egg').Service;
const JSEncrypt = require('node-jsencrypt');
const bcrypt = require('bcryptjs');
const moment = require('moment');


class UserService extends Service {
  /* 登录 */
  async login() {
    const { ctx, app } = this;
    // 设置私钥
    const prvKey = this.app.config.private_key;
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPrivateKey(prvKey);
    // 解密数据
    const paramsData = ctx.request.body.rsaParams;
    const prvData = JSON.parse(jsencrypt.decrypt(paramsData));
    const user_email = prvData.user_email;
    const user_password = prvData.user_password;
    // 查找用户名
    const user = await ctx.model.User.findOne({ include: { as: 'menu', model: ctx.model.UserLogin }, where: { user_email } });
    if (!user) {
      return ctx.fail('账号或密码不存在');
    }
    // 校验密码
    const res = bcrypt.compareSync(user_password, user.dataValues.menu.dataValues.user_password);
    if (res) {
      // 更新登录数据
      await ctx.model.User.update({ login_num: user.dataValues.login_num + 1, last_login_time: moment() }, { where: { uuid: user.dataValues.uuid } });
      // 生成token
      const token = app.jwt.sign({
        uuid: user.dataValues.uuid, // 需要存储的 token 数据
      }, app.config.jwt.secret, { expiresIn: '3m' }); // token过期

      // 存储session参数
      ctx.session.uuid = user.dataValues.uuid;
      ctx.session.user_email = user_email;
      console.log('登录session参数', ctx.session.uuid);
      return ctx.success('登录成功!', { token });
    }
    return ctx.fail('用户名或密码错误!');
  }

  /* 用户注册 */
  async register() {
    const { ctx } = this;
    // 设置私钥
    const prvKey = this.app.config.private_key;
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPrivateKey(prvKey);
    // 解密数据
    const paramsData = ctx.request.body.resParams;
    const prvData = JSON.parse(jsencrypt.decrypt((paramsData)));
    // 查找注册账号是否存在
    const is_user_email = await ctx.model.User.findOne({
      where: {
        user_email: prvData.user_email,
      },
    });
    if (!prvData.user_email || prvData.user_email === '') {
      return ctx.warn('账号不能为空');
    } else if (!prvData.user_password || prvData.user_password === '') {
      return ctx.warn('密码不能为空');
    } else if (is_user_email != null) {
      return ctx.warn('账号已被注册');
    }
    {
      // 对密码进行hash加密，salt加盐
      const salt = bcrypt.genSaltSync(10);
      const user_password = bcrypt.hashSync(prvData.user_password, salt);
      let res = {};
      const params = {
        uuid: ctx.helper.uuidSet(),
        user_name: prvData.user_name,
        user_email: prvData.user_email,
        user_password,
        user_type: 0,
        salt,
        create_time: new Date(),
      };

      try {
        const a = await ctx.model.UserLogin.create(params);
        console.log(a);
        res = await ctx.model.User.create(params);
        ctx.logger.info(res);
        return ctx.success('注册成功');
      } catch (error) {
        ctx.logger.error(error);
        return ctx.fail(error);
      }
    }
  }

  // 退出登录
  async logout() {
    const { ctx } = this;
    const token = ctx.request.header.token;
    const uuid = ctx.helper.uuidGet(token);
    const user = await ctx.model.User.findOne({ where: { uuid } });
    if (user) {
      // 清空登录session信息
      ctx.session.uuid = null;
      ctx.session.user_email = null;
      return ctx.success('登出成功！');
    }
    return ctx.fail('登出失败！');
  }
}
module.exports = UserService;

