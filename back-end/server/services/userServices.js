import models from '../model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';

const User = models.User;

class UserServices {
  async register(data) {
    console.log('11', data.name);
    let check = await User.findOne({
      where:{name: data.name}
    });
    console.log('22', check);
    if (check) {
      throw Error('该用户名已注册');
    }
    console.log(333);
    let password = bcrypt.hashSync(data.password, 10);
    console.log(password);    
    let result = await User.create({
      name: data.name,
      password
    });
    return result;
  }

  async login(data) {
    let check = await User.findOne({
      where: {name: data.name}
    });
    if (check) {
      if (bcrypt.compareSync(data.password, check.password)) {
        const userToken = {
          name: check.name,
          id: check.id,
          date: new Date()
        }
        const token = jwt.sign(userToken, config.jwtSecret, {
          expiresIn: 24 * 60 * 60 * 100
        });
        return token;
      } else {
        throw Error('密码输入错误');
      }
    } else {
      throw Error('用户不存在');
    }
  }
}

export default new UserServices();