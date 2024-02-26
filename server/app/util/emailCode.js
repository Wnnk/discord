const nodemailer = require('nodemailer');
let transporter;
module.exports = {
  // 创建发送者对象
  createTransporterInstance(ctx) {
    if (transporter) {
      return transporter;
    }
    /* 配置发送者 */
    transporter = transporter = nodemailer.createTransport({
      host: ctx.app.config.smtp.host,
      port: ctx.app.config.smtp.port,
      secure: true, // 使用 SSL
      auth: {
        user: ctx.app.config.smtp.user,
        pass: ctx.app.config.smtp.pass,
      },
    });
    return transporter;
  },

  // 创建发送内容
  createEmailInfo(ctx, receiver) {
    // 生成邮箱验证码
    const code = Math.random().toString().slice(2, 7);
    // 生成发送内容
    const info = {
      from: ctx.app.config.smtp.user, // 发送者
      to: receiver, // 接收者
      subject: '邮箱验证码', // 标题
      text: `您的验证码是：${code}`, // 文本内容
    };

    const emailCode = {
      code,
      expiration_time: Date.now() + 5000 * 60,
      create_time: Date.now(),
    };

    // 临时保存验证码5min
    // ctx.session.emailCode = {
    //   code,
    //   expire: Date.now() + 5000 * 60,
    // };
    return { info, emailCode };
  },

  // 发送邮件
  async sendEmailCode(ctx, receiver) {
    const transporter = this.createTransporterInstance(ctx);
    const { info, emailCode } = this.createEmailInfo(ctx, receiver);
    return new Promise((resolve, reject) => {
      transporter.sendMail(info, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(emailCode);
        }
      });
    });
  },

  // async verifyEmailCode(email, clientCode) {
  //   const { ctx } = this;
  //   // session保存的验证码和过期时间

  //   let serverCode;
  //   let serverExpire;
  //   try {
  //     serverCode = serverCaptha.code;
  //     serverExpire = serverCaptha.expire;
  //   } catch (error) {
  //     ctx.session.emailCode = null;
  //   }

  //   // 获取客户端的验证码进行对比
  //   if (Date.now() > serverExpire) {
  //     // 过期清理验证码
  //     ctx.session.emailCode = null;
  //     throw new Error('验证码已过期');
  //   } else if (serverCode !== clientCode) {
  //     // 一次性验证码，对比不正确清理验证码
  //     // ctx.session.emailCode = null;
  //     throw new Error('验证码不正确:');
  //   }
  //   // 只要客户端进行验证就保证清除验证码
  //   ctx.session.emailCode = null;
  //   return true;
  // },
};
