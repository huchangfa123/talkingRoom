import Socket from 'socket.io-client';
import config from '../config';
import SocketMonitor from './SocketMonitor';

let io = null;

export default async function getSocket() {
  try {
    // 如果没创建io实例则重新创建，一旦创建了io实例就直接返回io实例
    if (!io) {
      io = await Socket(config.location, { query: 'accessToken=' + config.options.headers['Authorization'] });
      io.on('connect', () => {
        console.log('连接成功');
        io.emit('join', 'lala')
      });
      SocketMonitor(io);
    }
    return io;
  } catch (error) {　
    return {
      code: 400,
      error
    };
  }
}
