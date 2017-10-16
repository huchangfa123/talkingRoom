import Socket from 'socket.io-client';
import config from '../config';

const io = getSocket();

export default io;

function getSocket() {
  const io = Socket(config.location);
  console.log('the result of connecte io:', io);

  io.on('connect', () => {
    console.log('连接成功');
  });

  require('./SocketMonitor').socketMonitor(io);
  return io;
}