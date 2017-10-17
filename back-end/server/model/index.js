import db from '../../sequelize';

const UserModel = './user.model.js'

const User = db.import(UserModel);

db.sync();
module.exports = {
  User
}