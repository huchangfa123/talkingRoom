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
    ctx.setAuthCookies(result.userData.id, result.userData.name)
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async logout(ctx, next) {
    let result = await userServices.logout(ctx.user);
    ctx.clearCookies();
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
    ctx.setAuthCookies(result.userData.id, result.userData.name)
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async createRoom(ctx, next) {
    let result = await userServices.createRoom(Object.assign(ctx.request.body, { id: ctx.user.id }));
    ctx.body = {
      code: 200,
      data: result.data
    };
  }

  async joinRoom(ctx, next) {
    let result = await userServices.joinRoom(Object.assign(ctx.request.body, { id: ctx.user.id }));
    ctx.body = {
      code: 200,
      data: result.data
    };
  }

  async leaveRoom(ctx, next) {
    let result = await userServices.getOutRoom({id: ctx.user.id, roomId: ctx.request.body.roomId});
    ctx.body = {
      code: 200,
      success: result
    }
  }

  async getMyRooms(ctx, next) {
    let result = await userServices.getMyRooms({id: ctx.user.id});
    ctx.body = {
      code: 200,
      rooms: result
    };
  }

  async getUserData(ctx, next) {
    let result = await userServices.getUserData({ id: ctx.user.id });
    ctx.body = {
      code: 200,
      data: result
    };
  }
}

export default new UserController();
