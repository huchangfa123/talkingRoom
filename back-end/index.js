import Koa from 'koa';
import http from 'http';
import SocketService from './FrameWork/socketIoWorker';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';

const app = new Koa();
const router = new Router();

app.use(bodyparser());
app.use(logger());
app.use(router.routes(), router.allowedMethods());

const server = http.createServer(app.callback());
SocketService(server);

server.listen(3000, function(){
  console.log('Server created on http://localhost:3000');
});




