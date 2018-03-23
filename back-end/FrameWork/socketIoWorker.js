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
    console.log('a client is joining!');
    var url = client.request.headers.referer;
    console.log('url', url)
    var splited = url.split('/');
    var roomId = splited[splited.length - 1]
    // 用户加入
    client.on('join', function (msg) {
      client.join(roomId)
      io.to(roomId).emit('join', '有人加入了房间')
      console.log('加入了房间', msg);
    });

    // 用户发送信息
    client.on('send.message', async function (msg) {
      console.log('message from:', roomId)
      console.log('message:', msg)
      await MessageServices.saveMessage(Object.assign(msg, {roomId}))
      io.to(roomId).emit('send.message', msg)
      console.log('client:', msg);
    });

    // 用户断开连接
    client.on('leave', function (msg) {
      client.emit('leave', 'disconnect')
    })

    // 用户离开房间    
    client.on('disconnect', function (msg) {
      client.leave(roomId)
      io.to(roomId).emit('user.leave', msg);
    });
  });
}

export default CreatSocketServer;