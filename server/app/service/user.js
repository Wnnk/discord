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
      await ctx.model.User.update({ login_num: user.dataValues.login_num + 1, last_login_time: moment(), status: 1 }, { where: { uuid: user.dataValues.uuid } });
      // await ctx.model.UserLogin.update({ status: 1 }, { where: { uuid: user.dataValues.uuid } });
      // 短期token
      const token = app.jwt.sign({
        uuid: user.dataValues.uuid, // 需要存储的 token 数据
      }, app.config.jwt.secret, { expiresIn: '2h' }); // token过期
      // 长期token
      const refreshToken = app.jwt.sign({
        uuid: user.dataValues.uuid,
      }, app.config.jwt.secret, { expiresIn: '15d' });
      // 存储session参数
      ctx.session.uuid = user.dataValues.uuid;
      ctx.session.user_email = user_email;
      console.log(ctx.session);
      // console.log('登录session参数', ctx.session.uuid);
      const result = {
        create_time: user.create_time,
        avator_url: user.avator_url,
        login_num: user.login_num,
        last_login_time: user.last_login_time,
        user_email: user.menu.user_email,
        user_name: user.user_name,
        uuid: user.uuid,
        note: user.note,
        status: user.status,
        nickname: user.nickname,
      };
      return ctx.success('登录成功!', { result, token, refreshToken });
    }
    return ctx.fail('用户名或密码错误!');
  }

  /* 用户信息修改 */
  async changeInfo() {
    const { ctx } = this;

    // 设置私钥
    const prvKey = this.app.config.private_key;
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPrivateKey(prvKey);

    // 解密数据
    const preData = ctx.request.body.data;
    /* 修改信息以及密码 */
    const info = JSON.parse(jsencrypt.decrypt(preData));
    const password = info.password;
    /* uuid */
    const uuid = ctx.helper.uuidGet();
    /* 校验密码正确性 */
    const isUser = await ctx.model.User.findOne({
      include: {
        as: 'menu',
        model: ctx.model.UserLogin,
      },
      where: {
        uuid,
      },
    });
    if (!isUser) {
      return ctx.fail('用户不存在!');
    }
    /* 校验重名 */
    const is_user_name = await ctx.model.User.findOne({
      where: {
        user_name: info.user_name,
      },
    });
    if (is_user_name !== null) {
      return ctx.fail('用户名已存在!');
    }
    /* 校验密码 */
    const isPasswordTrue = bcrypt.compareSync(password, isUser.dataValues.menu.dataValues.user_password);
    if (isPasswordTrue) {
      /* 密码正确，更新用户信息 */
      const isUpdateInfo = await ctx.model.User.update({
        nickname: info.nickname,
        user_name: info.user_name,
        user_email: info.user_email,
        note: info.note,
      }, { where: { uuid } });
      if (isUpdateInfo) {
        const user = await ctx.model.User.findOne({
          where: {
            uuid,
          },
        });
        const result = {
          create_time: user.create_time,
          avator_url: user.avator_url,
          login_num: user.login_num,
          last_login_time: user.last_login_time,
          user_email: user.user_email,
          user_name: user.user_name,
          uuid: user.uuid,
          note: user.note,
          status: user.status,
          nickname: user.nickname,
        };

        return ctx.success('修改成功!', { statu: 200, result });
      }
      return ctx.fail('修改失败!', { statu: 500 });
    }
    return ctx.fail('密码错误!', { statu: 400 });
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
    // 校验验证码
    const serverCaptha = await ctx.model.EmailCode.findOne({
      where: {
        email: prvData.user_email,
        code: prvData.email_captcha,
      },
    });
    const serverExpire = serverCaptha.dataValues.expiration_time;
    if (Date.now() > serverExpire) {
      /* 验证码过期 */
      await ctx.model.EmailCode.destroy({
        where: {
          email: prvData.user_email,
        },
      });
      return ctx.warn('验证码已经过期');
    }

    // 查找注册账号是否已经存在
    const is_user_email = await ctx.model.User.findOne({
      where: {
        user_email: prvData.user_email,
      },
    });
    // 重名问题
    const is_user_name = await ctx.model.User.findOne({
      where: {
        user_name: prvData.user_name,
      },
    });
    if (!prvData.user_email || prvData.user_email === '') {
      return ctx.warn('账号不能为空');
    } else if (!prvData.user_password || prvData.user_password === '') {
      return ctx.warn('密码不能为空');
    } else if (is_user_email != null) {
      return ctx.warn('账号已被注册');
    } else if (is_user_name != null) {
      return ctx.warn('昵称已被注册');
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
        await ctx.model.UserLogin.create(params);
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
    const user = await ctx.model.User.update({ status: 0 }, { where: { uuid } });

    if (user) {
      return ctx.success('登出成功！');
    }
    return ctx.fail('登出失败！');
  }

  async test() {
    const { ctx } = this;
    console.log(ctx);
  }

  async friend() {
    const { ctx } = this;
    const token = ctx.request.header.token;
    const uuid = ctx.app.jwt.verify(token, this.config.secret).uuid;
    const friends = await ctx.model.Friend.findAll({
      attributes: [ 'relationship', 'friend_uuid' ],
      where: { user_uuid: uuid },
    });
    const friends_uuid = friends.map(item => item.dataValues.friend_uuid);
    const result = await ctx.model.User.findAll({
      attributes: [ 'user_name', 'status', 'uuid' ],
      where: { uuid: friends_uuid },
    });

    result.forEach(obj1 => {
      const matchingFriend = friends.find(obj2 => obj1.dataValues.uuid === obj2.dataValues.friend_uuid);
      if (matchingFriend) {
        obj1.dataValues.relationship = matchingFriend.dataValues.relationship;
      }
    });
    if (result) {
      return ctx.success('查询成功', { result });
    }
    return ctx.fail('查询失败');
  }

  /* 好友模糊搜索 */
  async search() {
    const { Op } = require('sequelize');
    const { ctx } = this;
    const search_key = ctx.request.body.search_key;
    console.log(search_key);
    const friends = await ctx.model.User.findAll({
      where: {
        user_name: {
          [Op.like]: `%${search_key}%`,
        },
      },
      limit: 10,
      attributes: [ 'uuid', 'user_name', 'status', 'avator_url' ],
    });
    if (friends) {
      return ctx.success('查询成功', friends);
    }
  }

  async captcha() {
    const { ctx } = this;
    try {
      const { email } = ctx.request.body;
      const isUser = await ctx.model.User.findOne({
        where: {
          user_email: email,
        },
      });
      if (isUser) {
        return ctx.fail('用户已经存在');
      }
      const data = await ctx.helper.sendEmailCode(email);
      if (data) {
        /* Code储存数据库 */
        const params = {
          email,
          code: data.code,
          expiration_time: data.expiration_time,
          create_time: data.create_time,
        };
        await ctx.model.EmailCode.create(params);
        return ctx.success({ mag: '验证码发送成功' });
      }
    } catch (error) {
      return ctx.fail(`${error}`);
    }
  }

  /* 密码修改 */
  async changePassword(oldPassword, newPassword, confirmPassword) {
    const { ctx } = this;
    const uuid = ctx.helper.uuidGet();
    if (newPassword !== confirmPassword) return ctx.warn('两次密码不一致');
    try {
      /* 获得盐值 */
      const res = await ctx.model.UserLogin.findOne({
        where: {
          uuid,
        },
      });
      const salt = res.dataValues.salt;
      const sqlPassword = res.dataValues.user_password;
      /* 旧密码加盐 */
      oldPassword = bcrypt.hashSync(oldPassword, salt);
      /* 新密码加盐 */
      newPassword = bcrypt.hashSync(newPassword, salt);
      if (oldPassword === sqlPassword) {
        const successChange = await ctx.model.UserLogin.update({ user_password: newPassword }, {
          where: {
            uuid,
            user_password: oldPassword,
            salt,
          },
        });
        if (successChange) {
          return ctx.success('密码修改成功');
        }
      }
      return ctx.warn('旧密码错误');
    } catch (error) {
      return ctx.fail(`${error}`);
    }
  }
}
module.exports = UserService;

