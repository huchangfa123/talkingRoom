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

User.belongsToMany(Room, { as: 'Rooms', through: 'RoomWithUser' });
Room.belongsToMany(User, { as: 'Users', through: 'RoomWithUser' });
User.belongsToMany(User, { as: 'Friends', through: 'UsersFriends' });
Message.belongsTo(User, { as: 'From' });
Message.belongsTo(User, { as: 'To' });
RoomMessage.belongsTo(User, { as: 'From' });
RoomMessage.belongsTo(Room, { as: 'To' });
Auth.hasMany(User, { as: 'OnlineUsers' });

db.sync();
module.exports = {
  User,
  Room,
  Message,
  RoomMessage,
  Auth
};
