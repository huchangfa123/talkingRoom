import SocketIo from 'socket.io';

function CreatSocketServer(server) {
  const io = SocketIo(server);

  io.on('connection', function(client) {
    console.log('a client is joining!');
    client.on('join', function(msg) {
      console.log(msg);
    });
  });
}

export default CreatSocketServer;