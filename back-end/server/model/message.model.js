const MessageModel = function(sequelize, DataTypes) {
  return sequelize.define('room', {
    id: {type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true},
    from: { type: DataTypes.BIGINT(11), allowNull: false, comment:'发消者Id' },
    to: { type: DataTypes.BIGINT(11), allowNull: false, comment:'收消者Id' },
    msgType: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING }
  }, {
    timestamps: true
  })
}