'use strict';


const Controller = require('egg').Controller;

class GuildChatController extends Controller {
  async joinChannel() {
    const { ctx } = this;
    const { channel_id } = ctx.args[0];
    ctx.socket.join(channel_id);
    console.log(`加入${channel_id}房间`);
    console.log('现存连接', ctx.socket.adapter.rooms[channel_id].length);
  }

  async channelMessage() {
    const { ctx } = this;
    const { channel_id } = ctx.args[0];
    /* 发送给当前连接的客户端 */
    ctx.socket.to(ctx.socket.id).emit('roomMessage', 200);
    /* 发送给房间内所有的客户端 */
    ctx.socket.to(channel_id).emit('roomMessage', 200);
  }
  async leaveChannel() {
    const { ctx } = this;

    const { channel_id } = ctx.args[0];


    ctx.socket.leave(channel_id);
    console.log(`离开了${channel_id}房间`);
  }
}

module.exports = GuildChatController;
