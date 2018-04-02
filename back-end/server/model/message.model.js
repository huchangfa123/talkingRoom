const MessageModel = function(sequelize, DataTypes) {
  return sequelize.define(
    'message',
    {
      id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
      msgType: { type: DataTypes.STRING, allowNull: true },
      content: { type: DataTypes.TEXT, allowNull: true },
      contentType: { type: DataTypes.STRING, allowNull: true }
    },
    {
      timestamps: true
    }
  );
};

export default MessageModel;
