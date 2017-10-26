import Socket from 'socket.io-client';
import config from '../config';


export default async function getSocket() {
  const io = await Socket(config.location, {query: 'accessToken=' + config.options.headers['Authorization']});
  console.log('the result of connecte io:', io);

  io.on('connect', () => {
    console.log('连接成功');
  });

  require('./SocketMonitor').socketMonitor(io);
  return io;
}