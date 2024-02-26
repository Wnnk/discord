'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware, io } = app;
  // 重定向到swagger
  router.redirect('/', '/swagger-ui.html', 302);
  // middleware
  const jwtErr = middleware.jwtErr(app.config.jwt);
  const upLoad = middleware.upload();

  /* user */
  // 发送邮箱验证码
  router.post('/user/captcha', controller.user.captcha);
  /* register */
  router.post('/user/register', controller.user.register);
  // login
  router.post('/user/login', controller.user.login);
  // logout
  router.post('/user/logout', controller.user.logout);
  // 更改用户信息
  router.post('/user/changeInfo', jwtErr, controller.user.changeInfo);
  // friend_list
  router.post('/user/friend', jwtErr, controller.user.friend);
  // 好友搜索
  router.post('/user/search', jwtErr, controller.user.search);
  // 聊天界面的基本信息
  router.post('/information/public', jwtErr, controller.information.public);
  // 改变好友关系
  router.post('/information/relationship', jwtErr, controller.information.relationship);
  // 朋友聊天发送信息
  router.post('/message/friend', jwtErr, controller.message.createFriendMessage);
  // 朋友聊天发送图片
  router.post('/message/upload', jwtErr, controller.message.upload);
  router.post('/message/picture', jwtErr, controller.message.createmessagePicture);
  // socket.io实时连接
  io.of('/chat').route('privateMessage', app.io.controller.chat.privateMessage);
  io.of('/chat').route('join', app.io.controller.chat.join);
  io.of('/guildChat').route('joinChannel', app.io.controller.guildChat.joinChannel);
  io.of('/guildChat').route('channelMessage', app.io.controller.guildChat.channelMessage);
  io.of('/guildChat').route('leaveChannel', app.io.controller.guildChat.leaveChannel);
  io.of('/excel').route('joinExcel', app.io.controller.sheet.joinExcel);
  io.of('/excel').route('update', app.io.controller.sheet.update);
  io.of('/excel').route('leaveroom', app.io.controller.sheet.leaveRoom);

  /* 社区接口 */
  // 创建社区
  router.post('/guild/create', jwtErr, controller.guild.createGuild);
  // 查询社区列表
  router.post('/guild/getlist', jwtErr, controller.guild.getList);
  // 社区聊天列表
  router.post('/guild/chatlist', jwtErr, controller.guild.getChatList);
  // 社区频道
  router.post('/guild/channelSilde', jwtErr, controller.guild.getChannelList);
  // 社区成员
  router.post('/guild/memberstatus', jwtErr, controller.guild.getMemberStatus);
  // 频道标题
  router.post('/guild/title', jwtErr, controller.guild.getChannelTitle);
  // 发送社区信息
  router.post('/guild/chat', jwtErr, controller.guild.Chat);
  // 向社区发送图片信息
  router.post('/guild/picture', jwtErr, upLoad, controller.guild.Picture);

  /* 发现页面接口 */
  router.post('/discover/getguildList', jwtErr, controller.discover.getguildList);

  /* 用户拥有工作簿接口 */
  router.post('/sheet/getlist', jwtErr, controller.sheet.getlist);
  // 创建工作簿
  router.post('/sheet/new', jwtErr, controller.sheet.createSheet);
  // 创建工作表
  router.post('/sheet/newsheet', jwtErr, controller.sheet.newSheet);
  // gridKey
  router.post('/sheet/gridKey', jwtErr, controller.sheet.gridKey);
  // loadUrl
  router.post('/loadUrl', controller.sheet.loadUrl);
  // 获得工作簿下的工作表
  router.post('/sheet/getSheet', jwtErr, controller.sheet.getSheet);
  // 导入.xlsx文件
  router.post('/sheet/import', jwtErr, controller.sheet.improtFile);

  /* 论坛接口 */
  // 发布帖子
  router.post('/post/create', jwtErr, controller.post.newPost);
  // 回复帖子
  router.post('/reply', jwtErr, controller.post.replyPost);
  // 帖子列表获取
  router.post('/post/list', jwtErr, controller.post.getPostList);
  // 帖子详细内容获取
  router.post('/thread', jwtErr, controller.post.getPostDetail);
};
