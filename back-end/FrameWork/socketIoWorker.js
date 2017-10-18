import SocketIo from 'socket.io';
import config from '../config';
import jwt from 'jsonwebtoken';

function CreatSocketServer(server) {
  const io = SocketIo(server);
  io.use(function(socket, next) {
    let accessToken = socket.handshake.headers;
    if (!accessToken) {
      return next(new Error('Authentication error'));
    } else {
      jwt.verify(accessToken, config.jwtSecret, function(err, decoded) {
        if (err) {
          return next(new Error('Authentication error'));
        } else {
          return next();
        }
      })
    }
  });
  io.on('connection', function(client, cb) {
    console.log('a client is joining!');
    // 用户加入    
    client.on('join', function(msg) {
      client.broadcast.emit('user.join', msg);      
      console.log(msg);
    });

    // 用户发送信息
    client.on('send.message', function(msg){
      client.broadcast.emit('send.message', msg);
      console.log('client:', msg);
    });

    // 用户断开连接
    client.on('disconnect', function(msg) {
      console.log('a client is leaving:', msg);
      client.broadcast.emit('user.leave', msg);
    });
  });
}

export default CreatSocketServer;