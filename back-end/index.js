import Koa from 'koa';
import http from 'http';
import SocketService from './FrameWork/socketIoWorker';

const app = new Koa();

const server = http.createServer(app.callback());

SocketService(server);

server.listen(3000, function(){
  console.log('Server created on http://localhost:3000');
});




