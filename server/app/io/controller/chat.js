'use strict';
const user_list = {};

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async join() {
    const { ctx } = this;
    const { uuid } = ctx.args[0];
    user_list[uuid] = ctx.socket;
  }

  async privateMessage() {
    const { ctx } = this;
    const { friend_uuid } = ctx.args[0];
    const targetSocket = user_list[friend_uuid];
    if (targetSocket) {
      targetSocket.emit('privateMessage', 200);
    } else {
      targetSocket.emit('privateMessage', 400);
    }
  }


}

module.exports = ChatController;
