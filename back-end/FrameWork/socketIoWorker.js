import SocketIo from 'socket.io';
import config from '../config';
import jwt from 'jsonwebtoken';

function CreatSocketServer(server) {
  // 创建socketIo服务实例
  const io = SocketIo(server);
  // 给实例添加token判断
  io.use(function (socket, next) {
    let accessToken = socket.handshake.query.accessToken;
    if (!accessToken) {
      return next(new Error('Authentication error'));
    } else {
      jwt.verify(accessToken, config.jwtSecret, function (err, decoded) {
        if (err) {
          return next(new Error('Authentication error'));
        } else {
          return next();
        }
      })
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
      io.to(roomId).emit('有人加入了房间')
      console.log('加入了房间', msg);
    });

    // 用户发送信息
    client.on('send.message', function (msg) {
      io.to(roomId).emit(msg)
      console.log('client:', msg);
    });

    // 用户断开连接
    client.on('leave', function (msg) {
      client.emit('disconnect')
    })

    // 用户离开房间    
    client.on('disconnect', function (msg) {
      client.leave(roomId)
      io.to(roomId).emit('user.leave', msg);
    });
  });
}

export default CreatSocketServer;