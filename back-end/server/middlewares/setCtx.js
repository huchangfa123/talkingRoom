import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';

function setCtxUser() {
  return async function(ctx, next) {
    const token = ctx.cookies
    const xsrf = ctx.request.headers
    // console.log('token', token);
    // console.log('xsrf', xsrf)
    // if(token) {
    //   ctx.request.header.authorization = `Bearer ${token}`
    // }
    await next();
  }
}

function setCtxCookies() {
  
}

module.exports = {
  setCtxUser
}