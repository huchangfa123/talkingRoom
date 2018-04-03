import models from '../model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import { createColorCode } from '../utils/conveninentMothod';

const User = models.User;
const Auth = models.Auth;
const Room = models.Room;
const RoomMessage = models.RoomMessage;

class UserServices {
  async register(data) {
    let check = await User.findOne({
      where: { name: data.name }
    });
    if (check) {
      throw Error('该用户名已注册');
    }
    let password = bcrypt.hashSync(data.password, 10);
    let avatar = createColorCode();
    let result = await User.create({
      name: data.name,
      password,
      avatar
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
        console.log('userData.id', check.id)
        await authStatus.addOnlineUsers(check.id);
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
    let authStatus = await Auth.findOne({});
    let hasLogin = await authStatus.hasOnlineUsers(data.id);
    console.log('hasLogin',hasLogin)
    if (hasLogin) {
      await authStatus.removeOnlineUsers(data.id);
      return {
        name: data.name,
        message: 'success'
      };
    }
    throw Error('请先登录')
  }

  async ifLogin(data) {
    let userData = await User.findOne({ where: { id: data.id } });
    if (bcrypt.compareSync(data.password, userData.password)) {
      let authStatus = await Auth.findOne({});
      let hasLogin = null;
      if (authStatus) {
        console.log('userData.id', userData.id)
        hasLogin = await authStatus.addOnlineUsers(userData.id);
        console.log('result', hasLogin)
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
      console.log('1111', room)
  }

  async getUserData(data) {
    const user = await User.findOne({
      where: { id: data.id }
    });
    let authStatus = await Auth.findOne({});
    await authStatus.addOnlineUsers(data.id);
    return {
      userData: user
    };
  }

  async getOnlinePeople(data) {
    let allOnlineUsers = await Auth.findOne({});
    let result = await allOnlineUsers.getOnlineUsers();
    return result;
  }

  async createRoom(data) {
    let { name, avatar, id } = data;
    const user = await User.findById(id);
    if (!name) {
      throw Error('房间名不能为空!');
    }
    let hasRoom = await Room.findOne({ where: { name } });
    if (hasRoom) {
      throw Error('该房间已存在!');
    } else {
      if (!avatar) { avatar = createColorCode() }
      let newRoom = await Room.create({
        name,
        avatar
      });
      await newRoom.addUsers(id);
      return {
        message: '创建成功!',
        data: newRoom
      };
    }
  }

  async joinRoom(data) {
    const { name, id } = data;
    let RoomData = await Room.findOne({ where: { name } });
    if (!RoomData) {
      throw Error('不存在该房间!');
    } else {
      let hasUser = await RoomData.hasUsers(id);
      if (hasUser) {
        throw Error('已加入该房间!');
      } else {
        RoomData.addUsers(id);
        let onlineUsers = await this.getRoomsOnlineUser({roomId: RoomData.id})
        return {
          message: '加入成功!',
          data: {
            id: RoomData.id,
            avatar: RoomData.avatar,
            createdAt: RoomData.createdAt,
            name: RoomData.name,
            notice: RoomData.notice,
            updatedAt: RoomData.updatedAt,
            onlineUsers
          }
        };
      }
    }
  }

  async getOutRoom(data) {
    try {
      let { id, roomId } = data;
      let room = await Room.findById(roomId);
      await room.removeUsers(id);
      let users = await room.getUsers();
      if(users.length === 0) {
        await RoomMessage.destroy({where: {'toId': roomId}})
        await Room.destroy({where: {id: roomId}})
      }
      return true;
    } catch (error) {
      throw Error(error)
    }
  }

  async getMyRooms(data) {
    let user = await User.findOne({ where: { id: data.id } });
    let Rooms = await user.getRooms();
    let result = []
    for (let room of Rooms) {
      let onlineUsers = await this.getRoomsOnlineUser({roomId: room.id})
      let lastMessage = await RoomMessage.findOne({
        order: [['createdAt', 'DESC']],        
        where: {'toId': room.id},
        include: ['From']
      })
      result.push({
        id: room.id,
        avatar: room.avatar,
        createdAt: room.createdAt,
        name: room.name,
        notice: room.notice,
        updatedAt: room.updatedAt,
        onlineUsers,
        lastMessage: `<span>${lastMessage.From.name}: ${lastMessage.content}</span>`
      })
    }
    return result
  }
  
  async userDisconnect(data){
    let authStatus = await Auth.findOne({});
    let hasLogin = await authStatus.hasOnlineUsers(data.id);
    if (hasLogin) {
      await authStatus.removeOnlineUsers(data.id);
    }
  }

  async getRoomsOnlineUser(data) {
    let result = []
    let { roomId } = data;
    let AuthList = await Auth.findOne({})
    let onlineUsers = await AuthList.getOnlineUsers();
    for(let user of onlineUsers) {
      if (user.hasRooms(roomId)) {
        result.push(user);
      }
    }
    return result;
  }
}

export default new UserServices();
