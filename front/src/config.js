import cookie from 'js-cookie';

let data =  {
  location: 'http://localhost:3006',
  apiUrl: 'http://localhost:3006/api/v1/',
  options: {
    headers: {
      XSRF_TOKEN: `${cookie.get('XSRF_TOKEN')}`
    }
  },
  user: {},
  desktopNotification: true
};
export default data;

export function setToken(token) {
  data.options.headers.XSRF_TOKEN = token
}

export function setUser(user) {
  data.user = user;
}

export function setDesktopNotification(bool) {
  data.desktopNotification = bool;
}