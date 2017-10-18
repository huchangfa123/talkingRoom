module.exports = function onError() {
  return async(ctx, next) => {
    try {
      await next();
    } catch (e) {
      console.log('err11:', e);
      let code = 400;
      let message = e.message;
      if (e.status == 401) {
        ctx.status = 401;
        code = 401;
        message = '请先登录!'
      }
      ctx.body = {
        code,
        message
      }
    }
  }
}