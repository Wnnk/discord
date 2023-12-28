'use strict';

/**
 * @Controller
**/

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // test (delete test data when you use it)
  async test() {
    /**
    * @summary 测试数据库连接
    * @description 测试swagger
    * @router post /home/test
    * @request body test 配置请求携带参数
    * @Request header string token eg：write your params at here
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.home.test();
  }

  async index() {
    const { app, query } = this.ctx;

    // 给谁发, socket连接的id
    const id = query.id;
    const nsp = app.io.of('/');
    if (nsp.sockets[id]) {
    // 通过id给指定socket连接发送消息
      nsp.sockets[id].emit('res', 'hello http....');
    }
    // 给整个房间发送消息
    nsp.server.sockets.emit('room', '我要爬虫了');

    // https接口返回
    this.ctx.body = '发送成功';
  }

}

module.exports = HomeController;
