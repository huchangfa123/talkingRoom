import Redis from 'ioredis';

// const redis = new Redis({
//   host : '127.0.0.1',//安装好的redis服务器地址
//   port : 6378,　//端口
//   db: 0
// });

const redis = new Redis({
  host : 'redis',//安装好的redis服务器地址
  port : 6379,　//端口
  db: 0
});

export default redis;