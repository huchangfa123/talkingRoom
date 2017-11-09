const MessageModel = function(sequelize, DataTypes) {
  return sequelize.define(
    'roomMessage',
    {
      id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
      msgType: { type: DataTypes.STRING },
      content: { type: DataTypes.STRING }
    },
    {
      timestamps: true
    }
  );
};
