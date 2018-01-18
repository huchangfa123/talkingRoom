import cookie from 'js-cookie';
export default {
  location: 'http://localhost:3000',
  apiUrl: 'http://localhost:3000/api/v1/',
  options: {
    headers: {
      Authorization: `${cookie.get('accessToken')}`
    }
  }
};
