export default {
  location: 'http://192.168.1.188:3000',
  apiUrl: 'http://192.168.1.188:3000/api/v1/',
  options: {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
    }
  }
}