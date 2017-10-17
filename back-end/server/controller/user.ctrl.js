import userServices from '../services/userServices';

class UserController {
  async register(ctx, next) {
    let result = await userServices.register(ctx.request.body);
    ctx.body = {
      code: 200,
      msg: result
    }
  }
}

export default new UserController();