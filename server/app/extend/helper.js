const moment = require('moment');
const EmailCode = require('../util/emailCode');
module.exports = {
  // uuid格式：年月日时分秒3位毫秒+3位随机数，共20位  ===>   20190312162455043167
  uuidSet() {
    let uuid = moment().format('YYYYMMDDHHmmssSSS');
    uuid += (Array(3).join(0) + Math.random() * 100).slice(-3);
    return uuid;
  },
  // 获取token并转码为uuid
  uuidGet() {
    const token = this.ctx.request.header.authorization;
    const decode = this.ctx.app.jwt.verify(token, this.ctx.app.options.secret);
    return decode.uuid;
  },
  // 注册生成随机昵称
  makeName() {
    const num = Math.random(0.9).toString();
    const user_name = '花名' + num.substring(0, 6);
    return user_name;
  },
  // 随机字符串生成
  strSet(len = 32) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    console.log(result);
    return result;
  },
  // 发送邮箱验证码
  async sendEmailCode(receiver) {
    return await EmailCode.sendEmailCode(this.ctx, receiver);
  },
  // 验证邮箱验证码
  // verifyEmailCode(email, clientCode) {
  //   return EmailCode.verifyEmailCode(email, clientCode);
  // },
};
