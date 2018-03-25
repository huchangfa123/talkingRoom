import Router from 'koa-router';
import userRoute from './userRoute';
import messageRoute from './messageRoute';

const api = new Router({
  prefix: '/api/v1'
});

api.use('/user', userRoute.routes(), userRoute.allowedMethods());
api.use('/message', messageRoute.routes(), messageRoute.allowedMethods());

export default api;