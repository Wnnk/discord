'use strict';


const Service = require('egg').Service;

class PostService extends Service {
  async newPost() {
    const { ctx } = this;
    const data = ctx.request.body;
    const user_id = ctx.helper.uuidGet();
    const post_id = ctx.helper.uuidSet();
    const form = {
      user_id,
      id: post_id,
      title: data.title,
      content: data.content,
      create_time: new Date(),
      view_count: 0,
      reply_count: 0,
    };
    try {
      const res = await ctx.model.Post.create(form);
      return ctx.success('发布成功!', { statu: 200, result: res });
    } catch (error) {
      ctx.logger.error(error);
      return ctx.fail(error);
    }
  }

  async replyPost() {
    const { ctx } = this;
    const data = ctx.request.body;
    const id = ctx.helper.uuidSet();
    const user_id = ctx.helper.uuidGet();
    const form = {
      id,
      content: data.content,
      create_time: new Date(),
      user_id,
      post_id: data.post_id,
      parent_reply_id: data.parent_reply_id || null,
    };
    try {
      const res = await ctx.model.Reply.create(form);
      /* 添加留言量 */
      const addReplyCount = await ctx.model.Post.increment('reply_count', {
        where: { id: data.post_id },
      });
      if (res && addReplyCount) {
        return ctx.success('回复成功!', { statu: 200, result: res });
      }
    } catch (error) {
      ctx.logger.error(error);
      return ctx.fail(error);
    }
  }

  async getPostList(limit) {
    const { Sequelize } = require('sequelize');
    const { ctx } = this;
    try {
      const postHead = await ctx.model.Post.findAll({
        include: [
          {
            model: ctx.model.User,
            attributes: [ 'user_name', 'avator_url' ],
            as: 'PostList',
            where: {
              id: Sequelize.col('user_id'),
            },
          },
        ],
        attributes: [
          'id',
          'title',
          'content',
          'category_id',
          'view_count',
          'reply_count',
          'is_top',
          'is_deleted',
          'last_reply_time',
        ],
        limit,
        order: [[ 'create_time', 'DESC' ]],
      });
      return ctx.success('获取成功!', { statu: 200, result: postHead });

    } catch (error) {
      ctx.logger.error(error);
      return ctx.fail(error);
    }
  }

  async getPostDetail() {
    const { ctx } = this;
    const { Sequelize } = require('sequelize');
    const id = ctx.request.body.id;
    try {
      /* 获取楼主发帖内容 */
      const postHead = await ctx.model.Post.findOne({
        where: {
          id,
        },
        include: [
          {
            model: ctx.model.User,
            attributes: [ ],
            as: 'PostList',
            where: {
              id: Sequelize.col('user_id'),
            },
          },
        ],
        attributes: [ 'title', 'content', 'create_time', Sequelize.col('PostList.user_name'), Sequelize.col('PostList.avator_url') ],
        raw: true,
      });
      /* 帖子回复 */
      const postDetail = await ctx.model.Reply.findAll({
        where: {
          post_id: id,
          is_deleted: 0,
        },
        include: [
          {
            model: ctx.model.User,
            attributes: [],
            as: 'replyList',
            where: {
              id: Sequelize.col('user_id'),
            },
          },
          {
            model: ctx.model.User,
            attributes: [ ],
            as: 'parentReply',
          },

        ],
        attributes: [
          'id',
          'content',
          'create_time',
          'update_time',
          'parent_reply_id',
          'user_id',
          Sequelize.col('replyList.user_name'),
          Sequelize.col('replyList.avator_url'),
          [ Sequelize.col('parentReply.user_name'), 'parent_name' ],
        ],
        raw: true,
        order: [[ 'create_time', 'ASC' ]],
      });
      return ctx.success('获取成功!', { statu: 200, result: { postHead, postDetail } });
    } catch (error) {
      ctx.logger.error(error);
      return ctx.fail(error);
    }

  }

  async updateViewAndMessageCount(List, limit) {
    const { ctx } = this;
    try {
      await ctx.model.Post.bulkCreate(List, {
        updateOnDuplicate: [ 'view_count', 'reply_count' ],
      });
      const updatePostList = await this.getPostList(limit);
      const res = JSON.parse(updatePostList);
      return res;
    } catch (error) {
      return ctx.fail(error);
    }
  }
}
module.exports = PostService;
