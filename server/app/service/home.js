'use strict';

const { Service } = require('egg');
class HomeService extends Service {
  // test (delete test data when you use it)
  async test() {
    // const result = await this.app.mysql.query('select * from test', '');
    /* console.log('session的参数',this.ctx.session) */
    console.log('session的参数uuid', this.ctx.session.uuid);
    return JSON.stringify({
      code: 0,
      message: 'success',
      data: '通过token验证',
    });
  }

  // service module
}

module.exports = HomeService;
