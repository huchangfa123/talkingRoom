import config from '../config';
import cookie from 'js-cookie';
import { setToken } from '../config';
import { resetToken } from '../api/fetchData'

export function loginResult(loginResult = false, action) {
  if (action.type === 'userLogin' && action.data.data.token) {
    if (action.data.code === 200) {
      cookie.set('accessToken', action.data.data.token, { expires: 1 });
      setToken(`${action.data.data.token}`)
      resetToken(`${action.data.data.token}`)
      loginResult = action.data.data.userData;
    }
  }
  return loginResult;
}

export function registerResult(registerResult = '', action) {
  if (action.type === 'userRegister') {
    registerResult = action.data;
  }
  return registerResult;
}
