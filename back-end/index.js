import Koa from 'koa';
import http from 'http';
import SocketService from './FrameWork/socketIoWorker';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import api from './server/routers';
import onerror from './server/middlewares/onError';
import jwt from 'koa-jwt';
import config from './config';

const app = new Koa();

app.use(onerror());
app.use(bodyparser());
app.use(logger());

app.use(jwt({
  secret: config.jwtSecret
}).unless({
  path: [/^\/v1\/user\/[login|register]/]
}));

const server = http.createServer(app.callback());
SocketService(server);
app.use(api.routes(), api.allowedMethods());

server.listen(3000, function(){
  console.log('Server created on http://localhost:3000');
});