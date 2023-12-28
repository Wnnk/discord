'use strict';
const Controller = require('egg').Controller;
class Discover extends Controller {
  async getguildList() {
    /**
     * @description 展示热门的社区页面
     * @param 社区tag
     * @router post /discover/getguildList
    **/

    const { ctx } = this;
    ctx.body = await this.service.discover.getguildList();
  }
}

module.exports = Discover;
