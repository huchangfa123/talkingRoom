import SocketIo from 'socket.io';
import config from '../config';
import jwt from 'jsonwebtoken';
import MessageServices from '../server/services/messageServices';
import UserServices from '../server/services/userServices';
import redis from '../server/utils/redis';
import userServices from '../server/services/userServices';

function CreatSocketServer(server) {
  console.log('socketiocreate')
  // 创建socketIo服务实例
  const io = SocketIo(server);
  // 给实例添加token判断
  io.use(async function (socket, next) {
    let result = await redis.get(socket.handshake.headers.xsrftoken)
    if (result) {
      return next()
    } else {
      return next(new Error('Authentication error'));
    }
  });
　
  io.on('connection', function (client) {

    // 用户加入
    client.on('join', async function (msg) {
      client.join(msg.roomId)
      io.to(msg.roomId).emit('join', msg)
    });

    // 用户发送信息
    client.on('send.message', async function (msg) {
      await MessageServices.saveMessage(Object.assign(msg))
      io.to(msg.roomId).emit('send.message', msg)
    });

    // 用户退出房间
    client.on('user.leave.room', function (msg) {
      console.log('我有进来')
      io.to(msg.roomId).emit('user.leave.room', msg)
      client.leave(msg.roomId)
    })

    // 用户断开连接    
    client.on('disconnect', async function (msg) {
      await userServices.userDisconnect({id: client.handshake.headers.userid})
      io.emit('user.leave', {userId: client.handshake.headers.userid});
    });
  });
}

export default CreatSocketServer;