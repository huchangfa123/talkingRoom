import SocketIo from 'socket.io';
import config from '../config';
import jwt from 'jsonwebtoken';
import MessageServices from '../server/services/messageServices';
import redis from '../server/utils/redis';

function CreatSocketServer(server) {
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
    console.log('a client is connection!');

    // 用户加入
    client.on('join', function (msg) {
      client.join(msg.roomId)
      io.to(msg.roomId).emit('join', msg)
      console.log('加入了房间', msg);
    });

    // 用户发送信息
    client.on('send.message', async function (msg) {
      await MessageServices.saveMessage(Object.assign(msg))
      console.log('信息内容:', msg.roomId)
      io.to(msg.roomId).emit('send.message', msg)
    });

    // 用户断开连接
    client.on('leave', function (msg) {
      console.log('我 leave')      
      client.emit('leave', 'disconnect')
    })

    // 用户离开房间    
    client.on('disconnect', function (msg) {
      console.log('我 disconnect')
      client.leave(msg.roomId)
      io.to(msg.roomId).emit('user.leave', msg);
    });
  });
}

export default CreatSocketServer;