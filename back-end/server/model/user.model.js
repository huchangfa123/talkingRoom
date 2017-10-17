const UserModel = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true},
    name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING}
  })
};

export default UserModel;