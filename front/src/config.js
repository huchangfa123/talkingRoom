import cookie from 'js-cookie';

let data =  {
  location: 'http://localhost:3000',
  apiUrl: 'http://localhost:3000/api/v1/',
  options: {
    headers: {
      Authorization: `${cookie.get('accessToken')}`
    }
  }
};

export default data;

export function setToken(token) {
  data.options.headers.Authorization = token
}