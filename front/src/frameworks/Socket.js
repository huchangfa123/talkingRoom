import Socket from 'socket.io-client';
import config from '../config';
import SocketMonitor from './SocketMonitor';

let io = null;

export default async function getSocket() {
  try {
    if (!io) {
      io = await Socket(config.location, {query: 'accessToken=' + config.options.headers['Authorization']});
      io.on('connect', () => {
        console.log('连接成功');
      });
      SocketMonitor(io);
    }
    return io;
  } catch (error) {
    return {
      code: 400,
      error
    }
  }
}