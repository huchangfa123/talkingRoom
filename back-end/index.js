import Koa from 'koa';
import http from 'http';
import SocketService from './FrameWork/socketIoWorker';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import api from './server/routers';
import onerror from './server/middlewares/onError';

const app = new Koa();

app.use(onerror());
app.use(bodyparser());
app.use(logger());
app.use(api.routes(), api.allowedMethods());

const server = http.createServer(app.callback());
SocketService(server);

server.listen(3000, function(){
  console.log('Server created on http://localhost:3000');
});