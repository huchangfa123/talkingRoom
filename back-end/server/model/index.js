import db from '../../sequelize';

const UserModel = './user.model.js';
const RoomModel = './room.model.js';
const MessageModel = './message.model.js';
const RoomMessageModel = './roomMessage.model.js';
const AuthModel = './auth.js';

const User = db.import(UserModel);
const Room = db.import(RoomModel);
const Message = db.import(MessageModel);
const RoomMessage = db.import(RoomMessageModel);
const Auth = db.import(AuthModel);

User.belongsToMany(Room, { as: 'users', through: 'RoomWithUser', foreignKey: 'id' });
User.belongsToMany(User, { as: 'friends', through: 'UsersFriends', foreignKey: 'id' });
Room.belongsToMany(User, { as: 'rooms', through: 'RoomWithUser', foreignKey: 'id' });
Message.belongsTo(User, { as: 'from', foreignKey: 'id' });
Message.belongsTo(User, { as: 'to', foreignKey: 'id' });
RoomMessage.belongsTo(User, { as: 'from', foreignKey: 'id' });
RoomMessage.belongsTo(Room, { as: 'to', foreignKey: 'id' });
Auth.hasMany(User, { as: 'onlineUsers', foreignKey: 'id' });

db.sync();
module.exports = {
  User,
  Room,
  Message,
  RoomMessage,
  Auth
};
