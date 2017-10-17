import userServices from '../services/userServices';

class UserController {
  async register(ctx, next) {
    try {
      let result = await userServices.register(ctx.request.body);
      ctx.body = {
        code: 200,
        msg: result
      }
    } catch (error) {
      ctx.throw(400, '信息有误');
    }
  }
}

export default new UserController();