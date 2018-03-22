import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import _ from 'underscore';
import { SHA256 } from 'crypto-js';

function setCtxUser() {
  return async function(ctx, next) {
    const token = ctx.cookies.get('ACCESS_TOKEN')
    const xsrf = ctx.request.headers['XSRF_TOKEN']

    if(token) {
      let baseData = await jwt.verify(token, config.jwtSecret);
      ctx.request.header.authorization = `Bearer ${token}`
      ctx.user = {
        id: baseData.id,
        name: baseData.name
      }
    } else {
      throw Error()
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