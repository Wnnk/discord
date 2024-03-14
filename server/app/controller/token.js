'use strict';
const Controller = require('egg').Controller;
class TokenController extends Controller {
  async refreToken() {
    /**
     * @description 临期token刷新
    **/

    const { ctx } = this;
    ctx.body = await this.service.token.refreToken();
  }
}

module.exports = TokenController;
