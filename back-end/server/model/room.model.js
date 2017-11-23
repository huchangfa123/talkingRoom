const RoomModel = function(sequelize, DataTypes) {
  return sequelize.define(
    'room',
    {
      id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
      name: { type: DataTypes.STRING },
      notice: { type: DataTypes.STRING, allowNull: true },
      avatar: { type: DataTypes.STRING, allowNull: true }
    },
    {
      timestamps: true
    }
  );
};

export default RoomModel;
