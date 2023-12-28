'use strict';

const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

/**
 * @Controller
**/

const Controller = require('egg').Controller;

class MessageController extends Controller {
  // 获取聊天界面个人信息
  async createFriendMessage() {
    /**
     * @summary 发送信息
     * @description 进入聊天界面给朋友发送信息
     * @router post /message/friend
     * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.message.createFriendMessage();
  }

  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
    const target = path.join('app/public/upload', filename);
    // 写入文件
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    const friend_uuid = stream.fields.uuid; // 接收FormData其他数据!!!
    ctx.customParam = {
      filename,
      friend_uuid,
    };
    this.ctx.body = {
      code: 200,
      data: {
        filename,
        friend_uuid,
      },
    };
  }

  // 发送图片
  async createmessagePicture() {
    /**
     * @summary 发送图片
     * @description 进入聊天界面给朋友发送图片
     * @router post /message/picture
     * @response 200 JsonResult 操作结果
     * @ResponseBody 200
    */
    const { ctx } = this;
    ctx.body = await this.service.message.createmessagePicture();
  }
}

module.exports = MessageController;
