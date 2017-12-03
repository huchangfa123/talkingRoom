import config from '../config';
import cookie from 'js-cookie';

export function loginResult(loginResult = false, action) {
  if (action.type === 'user-login' && action.data.data.token) {
    if (action.data.code === 200) {
      cookie.set('accessToken', action.data.data.token, { expires: 1 });
      config.options.headers.Authorization = `${cookie.get('accessToken')}`;
      loginResult = action.data.data.userData;
    }
  }
  return loginResult;
}

export function registerResult(registerResult = '', action) {
  if (action.type === 'user-register') {
    registerResult = action.data;
  }
  return registerResult;
}
