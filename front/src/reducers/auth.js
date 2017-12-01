import { USER_LOGIN, USER_REGISTER } from '../action/UserAction';
import config from '../config';
import cookie from 'js-cookie';

export function loginResult(loginResult = false, action) {
  console.log(2313, action.data);
  if (action.type === USER_LOGIN && action.data.data.token) {
    if (action.data.code === 200) {
      cookie.set('accessToken', action.data.data.token, { expires: 1 });
      config.options.headers.Authorization = `${cookie.get('accessToken')}`;
      loginResult = action.data.data.userData;
      console.log('222', loginResult);
    }
  }
  return loginResult;
}

export function registerResult(registerResult = '', action) {
  if (action.type === USER_REGISTER) {
    registerResult = action.data;
  }
  return registerResult;
}
