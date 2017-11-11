const AuthModel = function(sequelize, DataTypes) {
  return sequelize.define(
    'auth',
    {
      id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true }
    },
    {
      timestamps: true
    }
  );
};

export default AuthModel;
