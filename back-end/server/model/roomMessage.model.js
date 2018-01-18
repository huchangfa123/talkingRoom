const RoomMessageModel = function(sequelize, DataTypes) {
  return sequelize.define(
    'roomMessage',
    {
      id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
      msgType: { type: DataTypes.STRING, allowNull: true },
      content: { type: DataTypes.STRING, allowNull: true }
    },
    {
      timestamps: true
    }
  );
};

export default RoomMessageModel;
