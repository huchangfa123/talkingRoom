export default {
  location: 'http://192.168.1.181:3000',
  apiUrl: 'http://192.168.1.181:3000/api/v1/',
  options: {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
    }
  }
}