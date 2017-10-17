const UserModel = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING}
  })
};

export default UserModel;