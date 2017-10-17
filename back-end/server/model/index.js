import db from '../../sequelize';
import UserModel from './user.model';

const User = db.import(UserModel);

module.exports = {
  User
}