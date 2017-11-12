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

User.belongsToMany(Room, { as: 'users', through: 'RoomWithUser' });
User.belongsToMany(User, { as: 'friends', through: 'UsersFriends' });
Room.belongsToMany(User, { as: 'rooms', through: 'RoomWithUser' });
Message.belongsTo(User, { as: 'from' });
Message.belongsTo(User, { as: 'to' });
RoomMessage.belongsTo(User, { as: 'from' });
RoomMessage.belongsTo(Room, { as: 'to' });
Auth.hasMany(User, { as: 'onlineUsers' });

db.sync();
module.exports = {
  User,
  Room,
  Message,
  RoomMessage,
  Auth
};
