import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import _ from 'underscore';
import { SHA256 } from 'crypto-js';
import redis from '../utils/redis';

function setCtxUser() {
  return async function(ctx, next) {
    console.log('我聊天的时候有进来这里')
    const token = ctx.cookies.get('ACCESS_TOKEN')
    // 设置的header不能有大写和下划线
    const xsrf = ctx.request.headers['xsrftoken']
    // 不是登录或者注册的时候，要检查xsrftoken
    if (!/(\/login)|(\/register)/.test(ctx.url)) {
      if(token) {
        let baseData = await jwt.verify(token, config.jwtSecret);
        if (!xsrf || xsrf.toString() !== baseData.xsrf.toString()) {
          throw Error('用户身份验证失败')
        } else {
          redis.set(xsrf, true);
          redis.expire(xsrf, 60 * 60 * 24);
        }
        ctx.request.header.authorization = `Bearer ${token}`
        ctx.user = {
          id: baseData.id,
          name: baseData.name,
          xsrf: baseData.xsrf
        }
      } else {
        throw Error('用户身份验证失败')
      }
    }
    await next();
  }
}

function setCtxCookies() {
  return async function(ctx, next) {
    ctx.clearCookies = () => {
      ctx.cookies.set('XSRF_TOKEN', null, {
        overwrite: true,
        expires: new Date()
      })
      ctx.cookies.set('ACCESS_TOKEN', null, {
        overwrite: true,
        expires: new Date()
      })
    }

    ctx.setAuthCookies = (id, name) => {
      const xsrf = SHA256(_.random(999999999)).toString()
      const date = new Date().getTime() + 86400000
      ctx.cookies.set('XSRF_TOKEN', xsrf, {
        httpOnly: false,
        overwrite: true,
        expires: new Date(date)
      })
 
      const token = jwt.sign({
        id,
        name,
        xsrf,
        date: new Date()
      }, config.jwtSecret)

      ctx.cookies.set('ACCESS_TOKEN', token, {
        httpOnly: true,
        overwrite: true,
        expires: new Date(date)
      })

      return {
        xsrf
      }
    }
    await next()
  }

}

module.exports = {
  setCtxUser,
  setCtxCookies
}