export default {
  location: 'http://192.168.1.172:3000',
  apiUrl: 'http://192.168.1.172:3000/api/v1/',
  options: {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
    }
  }
}