import Router from 'koa-router';
import userRoute from './userRoute';

const api = new Router({
  prefix: '/api/v1'
});

api.use('/user', userRoute.routes(), userRoute.allowedMethods());

export default api;