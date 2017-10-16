import sequelize from '../../sequelize';
import Sequelize from 'sequelize';

const User = sequelize.define('user', {
  name: {type: Sequelize.STRING},
  password: {type: Sequelize.STRING}
});

export default User;