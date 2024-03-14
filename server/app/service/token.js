'use strict';

const { Service } = require('egg');
class TokenService extends Service {
  // test (delete test data when you use it)
  async refreToken() {
    const { ctx, app } = this;
    const refreshToken = ctx.request.body.refreshToken;
    try {
      const decode = ctx.app.jwt.verify(refreshToken, app.options.secret);
      if (decode && refreshToken) {
        const newtoken = app.jwt.sign({
          uuid: decode.uuid, // 需要存储的 token 数据
        }, app.config.jwt.secret, { expiresIn: '2h' }); // token过期
        return ctx.success('刷新成功!', { newtoken });
      }
    } catch (error) {
      ctx.status = 403;
      ctx.body = {
        massage: 'refretoken已过期,请重新登录',
        code: -1,
      };
      return ctx.body;
    }
  }

}

module.exports = TokenService;
