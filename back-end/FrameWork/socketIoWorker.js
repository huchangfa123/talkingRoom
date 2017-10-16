import SocketIo from 'socket.io';

function CreatSocketServer(server) {
  const io = SocketIo(server);
  io.use(function(socket, next) {
    return next();
  });
  io.on('connection', function(client) {
    console.log('a client is joining!');
    // 用户加入    
    client.on('join', function(msg) {
      console.log(msg);
    });

    // 用户发送信息
    client.on('send.message', function(msg){
      client.broadcast.emit('send.message', msg);
      console.log('client:', msg);
    });

    // 用户断开连接
    client.on('disconnect', function(msg) {
      client.broadcast.emit('disconnect', msg);
    });
  });
}

export default CreatSocketServer;