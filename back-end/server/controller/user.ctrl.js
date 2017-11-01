import userServices from '../services/userServices';

class UserController {
  async register(ctx, next) {
    let result = await userServices.register(ctx.request.body);
    ctx.body = {
      code: 200,
      msg: result
    }
  }

  async login(ctx, next) {
    let result = await userServices.login(ctx.request.body);
    ctx.body = {
      code: 200,
      data: result
    }
  }
}

export default new UserController();