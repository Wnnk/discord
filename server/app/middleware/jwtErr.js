module.exports = options => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.headers.token;
    if (token) {
      try {
        // 解码token
        const decode = ctx.app.jwt.verify(token, options.secret);
        if (decode) {
          console.log('执行next');
          await next();
        }
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          massage: 'token已过期,请重新登录',
          code: -1,
          error: `${error}`,
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: 'token不存在',
        code: -1,
      };
    }
  };
};
