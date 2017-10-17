import models from '../model';

const User = models.User;

class UserServices {
  async register(data) {
    let check = await User.findOne({name: data.name});
    if (check) {
      throw Error('该用户名已注册');
    }
    let result = await User.create({
      name: data.name,
      password: data.password
    });
    return result;
  }
}

export default new UserServices();