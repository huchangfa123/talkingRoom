import models from '../model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';

const User = models.User;
const Auth = models.Auth;

class UserServices {
  async register(data) {
    let check = await User.findOne({
      where: { name: data.name }
    });
    if (check) {
      throw Error('该用户名已注册');
    }
    let password = bcrypt.hashSync(data.password, 10);
    console.log(password);
    let result = await User.create({
      name: data.name,
      password
    });
    return result;
  }

  async login(data) {
    // 判断是否有该用户
    let check = await User.findOne({
      where: { name: data.name }
    });
    if (check) {
      // 验证该用户密码
      if (bcrypt.compareSync(data.password, check.password)) {
        // 添加用户到在线表
        let authStatus = await Auth.findOne({});
        if (!authStatus) {
          authStatus = await Auth.create({});
        }
        let hasLogin = await authStatus.hasOnlineUsers(check.id);
        if (!hasLogin) {
          authStatus.addOnlineUsers(check.id);
        } else {
          throw Error('用户已登录');
        }
        const userToken = {
          name: check.name,
          id: check.id,
          date: new Date()
        };
        const token = jwt.sign(userToken, config.jwtSecret, {
          expiresIn: 24 * 60 * 60 * 100
        });
        return {
          token,
          userData: check
        };
      } else {
        throw Error('密码输入错误');
      }
    } else {
      throw Error('用户不存在');
    }
  }

  async logout(data) {
    let userData = await jwt.verify(data.accessToken, config.jwtSecret);
    if (userData) {
      let authStatus = await Auth.findOne({});
      let hasLogin = await authStatus.hasOnlineUsers(userData.id);
      if (hasLogin) {
        await authStatus.removeOnlineUsers(userData.id);
        return {
          name: userData.name,
          msg: 'success'
        };
      }
    }
    throw Error('用户未登录');
  }

  async getOnlinePeople(data) {
    let allOnlineUsers = await Auth.findOne({});
    let result = await allOnlineUsers.getOnlineUsers();
    return result;
  }
}

export default new UserServices();
