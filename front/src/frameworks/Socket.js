import Socket from 'socket.io-client';
import config from '../config';

function getSocket() {
  const io = Socket(config.location);

  io.on('connect', () => {
    console.log('连接成功');
  });
}