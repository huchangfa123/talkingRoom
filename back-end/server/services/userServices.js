import models from '../model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';

const User = models.User;
const Auth = models.Auth;
const Room = models.Room;

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
        await authStatus.hasOnlineUsers(check.id);
        return {
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
          message: 'success'
        };
      }
    }
    throw Error('用户未登录');
  }

  async ifLogin(data) {
    let userData = await User.findOne({ where: { name: data.name } });
    if (bcrypt.compareSync(data.password, userData.password)) {
      let authStatus = await Auth.findOne({});
      let hasLogin = null;
      if (authStatus) {
        hasLogin = await authStatus.hasOnlineUsers(userData.id);
      } else {
        await Auth.create({});
      }
      if (hasLogin) {
        return {
          hasLogin: true,
          userData
        };
      }
    }
    return {
      hasLogin: false
    };
  }

  async getUserData(data) {
    let baseData = await jwt.verify(data.accessToken, config.jwtSecret);
    if (baseData) {
      const user = await User.findOne({
        where: { id: baseData.id }
      });
      return {
        token: data.accessToken,
        userData: user
      };
    } else {
      throw Error('token已过期');
    }
  }

  async getOnlinePeople(data) {
    let allOnlineUsers = await Auth.findOne({});
    let result = await allOnlineUsers.getOnlineUsers();
    return result;
  }

  async createRoom(data) {
    const userData = await jwt.verify(data.accessToken, config.jwtSecret);
    const user = await User.findById(userData.id);
    const { name, avatar } = data;
    if (!name) {
      throw Error('房间名不能为空!');
    }
    let hasRoom = await Room.findOne({ where: { name } });
    if (hasRoom) {
      throw Error('该房间已存在!');
    } else {
      let newRoom = await Room.create({
        name,
        avatar
      });
      await newRoom.addUsers(userData.id);
      let Rooms = await user.getRooms();
      return {
        message: '创建成功!',
        data: Rooms
      };
    }
  }

  async joinRoom(data) {
    const userData = await jwt.verify(data.accessToken, config.jwtSecret);
    const { name } = data;
    let RoomData = await Room.findOne({ where: { name } });
    if (!RoomData) {
      throw Error('不存在该房间!');
    } else {
      let hasUser = RoomData.hasUsers(userData.id);
      if (hasUser) {
        throw Error('已加入该房间!');
      } else {
        RoomData.addUsers(userData.id);
        let user = await user.findById(userData.id);
        const Rooms = await user.getRooms();
        return {
          message: '加入成功!',
          data: Rooms
        };
      }
    }
  }

  async getMyRooms(data) {
    const userData = await jwt.verify(data.accessToken, config.jwtSecret);
    let user = await User.findOne({ where: { id: userData.id } });
    let Rooms = await user.getRooms();
    return {
      Rooms
    };
  }
}

export default new UserServices();
