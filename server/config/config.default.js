/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611899213926_5071';

  /* private key */
  config.private_key = `-----BEGIN PRIVATE KEY-----
  MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCqS4uohYBIFHO5
  0a9zZER0AcEsCK+2eg8jc1lj+t7HEoZm/c1tZT1vGGmwy61VOj3AOB2krpSU7cer
  zzP1ualeVyRCr0DAKZM/NldnPeXhvzjJV7m8twJeY/Bl3R9yyEt5G/T6dbRakChj
  ZXsLvNmezZUiXE+RMhKn6gpApuCHdsEVY51wEdNtHnhrPMe07vUjMbgJr7sCE18u
  8uiYIen+OHCGljlXFrxYaGAQbEPtwlMKNj3DprX4vxw/n2EYpB8AUQGNxBHCC7ME
  ZgLGbgjCjeWLJKreOZ9GKE5PHIbw2D2bTlaAA6fLQGJlNY9AHTE6o4lKIi+K7AVB
  eTr7kcrZAgMBAAECggEAGj6SQ2JvpqwgOZ7rHylws0Ah+RtNmR2uf5QjTpk3BA8C
  z5SFuDpGAX0NrMV27Q+QvLLpPpv5IgqTHxNLuq7mPzfGytAfdn3xx2gkiDCt4OCL
  a9wtL7w0jT9xqQEu+42KtBtu4bqKFPrqfocBM4njL+oW9bisOoAxB9e1xMjzCW0v
  TxqDfuhQCK3yEMrxx3qqb4gWMOdKSwl64/XGs6CnoON/Vd882fl61wHHxh6Ytf6C
  nWCa375TeDxuEpvBb/m3XVIVnF7ODFnkN3qxPLY4mcC6NnKSp1dXnW3avNa1fVOi
  qddHpjh3MFfwbmAzUou+ICGXNE3QxLPUAM7U+4qlkQKBgQDesCQ/DH7pFRYqWEzo
  IdSXFP6Fas5IfGUcavbseTyOLjXICp/2zkLYsK207XUgUCOXckSAd8TqZfZeMs83
  rmRs+3YPhSFwfhpqU9Pcmro/SjAC3WyAIejILRC9+tq7qIbX9QIb/tIyW3WcIrRD
  0dscsSy8JOwPkzAAOZgZSeXmxwKBgQDDxQLgbm1T9ozZNS4PKig1cgBcD/1zRjf+
  5tggyXGYMxY4UQKpTy5oDZtFCxReM7D3g/2yVn9EkECFtCfCHAAKp6UI/HVZtUsy
  9VaeBjQB127rUTw+wvTo0i+Wi/uTavaoHxnNRhUI7tncgY0dIQaMrsgHSwCqzYru
  Td2Jp/KhXwKBgHQp+E53a0CVQmHGfB/fffFt/zODuqXvViNT3QkQWTll+6IlgLqT
  cCVvTL4D3MSFaXuYHQnS8ILBu5n58UR/kV2Uc0q3TPFMpuTuY6dBg4R+Y7sq3G2e
  wrqhX4lq8W1RBT5kTbxi2i1wrlJLfDOgpic6eTaQICAjzLdhU+llNiuDAoGANMSo
  xtfdDjG5u15zQNErL2TAJhCFT4oQ09tjTEsgHFdA2QM1BW/7YT6xqIWZAt9KBx2D
  x4s7GL8NNTzfLpofhL+1Y1uxQfH1CBJLO6MOZ6SrGDC4XW5tV0g4XYrzz8OYIq7n
  ZIZMazD+dkpRQBXDzy3ZauXTkzZ+CUfhvBYR918CgYAnDSLQ3XKZcIJQhaOkPQTB
  qDoS/1ZGaSVVeSw28/ljEJAoSRfOuGFdReb/cLrDQd5aY3c5j3/ZyvtFO0uZF/qT
  ICtSBSzX+9XFhHH02Em5x2s1YhrNGtL+qrKEFXdcNpoO0sP1VQtI+iZMv79DcDAW
  i0K3ZxN2+Esah/06/+XSoA==
  -----END PRIVATE KEY-----`;

  // add your middleware config here
  // config.middleware = [ 'errorHandler' ];
  config.jwt = {
    secret: '123456',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // swagger配置
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径
    // 接口文档的标题，描述或其它
    apiInfo: {
      title: 'EggZoneFrame-Api', // 接口文档的标题
      description: '接口api文档(开发环境)', // 接口文档描述
      version: '1.0.0', // 接口文档版本
    },
    schemes: [ 'http', 'https' ], // 配置支持的协议
    consumes: [ 'application/json', 'multipart/form-data' ], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html
    produces: [ 'application/json', 'multipart/form-data' ], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
    securityDefinitions: { // 配置接口安全授权方式
    },
    enableSecurity: false, // 是否启用授权，默认 false（不启用）
    enableValidate: false, // 是否启用参数校验，默认 true（启用）
    routerMap: true, // 是否启用自动生成路由，默认 true (启用)
    enable: true, // 默认 true (启用),
  };


  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://localhost:5173', 'http://47.113.190.38' ],
  };
  config.cors = {
    origin: 'http://localhost:5173', /* 一定要是域名端口 */
    credentials: true, /* credentials设置为true,和前端保持一致 */
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  // config.redis = {
  //   client: {
  //     host: '127.0.0.1',
  //     port: 6379,
  //     password: null,
  //     bd: '0',
  //   },
  //   agent: true,
  // };
  /* session配置 */
  config.session = {
    key: 'EGG_SESS', /* eggjs默认session的key */
    maxAge: 24 * 3600 * 1000, /* 1 day */
    httpOnly: true,
    encrypt: true,
    renew: true, /* 每次访问页面都会给session会话延长时间 */
  };

  /* passport 鉴权(用于第三方登录) */
  config.passportLocal = {
    usernameField: 'username',
    passwordField: 'password',
  };
  // 静态文件
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    maxAge: 30000000,
  };
  /* socket.io */
  config.io = {
    // init: {
    //   wsEngine: 'ws',
    // },
    namespace: {
      '/chat': {
        connectionMiddleware: [ ],
        packetMiddleware: [],
      },
      '/guildChat': {
        connectionMiddleware: [ ],
        packetMiddleware: [],
      },
      '/excel': {
        connectionMiddleware: [ ],
        packetMiddleware: [],
      },
    },
  };
  config.smtp = {
    host: 'smtp.qq.com',
    port: 465,
    user: '1275056222@qq.com',
    pass: 'ugcddycxnbrdigej',
  };
  // config.websocket = {
  //   redis: {
  //     host: '127.0.0.1',
  //     port: 6379,
  //   },
  // };
  return {
    ...config,
    ...userConfig,
  };
};
