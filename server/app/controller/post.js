'use strict';

/**
 * @Controller
**/

const Controller = require('egg').Controller;

class PostController extends Controller {
  async newPost() {
    /**
     * @description 发布帖子
     * @param1 form
     *
    **/
    const { ctx } = this;
    ctx.body = await this.service.post.newPost();
  }

  /**
   * @description 回复帖子
   * @param1 form
  */
  async replyPost() {
    const { ctx } = this;
    ctx.body = await this.service.post.replyPost();
  }

  /**
   * @description 获取帖子列表
  */
  async getPostList() {
    const { ctx } = this;
    ctx.body = await this.service.post.getPostList();
  }

  /**
   * @description 获取帖子详细页
  */
  async getPostDetail() {
    const { ctx } = this;
    ctx.body = await this.service.post.getPostDetail();
  }
}
module.exports = PostController;
