module.exports = function onError () {  
  return async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.body = {
        code: 400,
        message: e.message
      }
    }
  } 
}

