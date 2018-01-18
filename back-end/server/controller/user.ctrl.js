import userServices from '../services/userServices';

class UserController {
  async register(ctx, next) {
    let result = await userServices.register(ctx.request.body);
    ctx.body = {
      code: 200,
      msg: result
    };
  }

  async login(ctx, next) {
    let result = await userServices.login(ctx.request.body);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async logout(ctx, next) {
    let result = await userServices.logout({ accessToken: ctx.headers.authorization });
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async onlineUsers(ctx, next) {
    let result = await userServices.getOnlinePeople();
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async ifLogin(ctx, next) {
    let result = await userServices.ifLogin(ctx.request.body);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async createRoom(ctx, next) {
    const data = Object.assign({ accessToken: ctx.headers.authorization }, ctx.request.body);
    let result = await userServices.createRoom(data);
    ctx.body = {
      code: 200,
      result
    };
  }

  async joinRoom(ctx, next) {
    const data = Object.assign({ accessToken: ctx.headers.authorization }, ctx.request.body);
    let result = await userServices.joinRoom(data);
    ctx.body = {
      code: 200,
      result
    };
  }

  async getMyRooms(ctx, next) {
    const data = Object.assign({ accessToken: ctx.headers.authorization }, ctx.request.body);
    let result = await userServices.getMyRooms(data);
    ctx.body = {
      code: 200,
      result
    };
  }

  async getUserData(ctx, next) {
    let result = await userServices.getUserData({ accessToken: ctx.headers.authorization });
    ctx.body = {
      code: 200,
      data: result
    };
  }
}

export default new UserController();
