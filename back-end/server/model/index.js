import db from '../../sequelize';

const UserModel = './user.model.js';
const RoomModel = './room.model.js';
const messageModel = './message.model.js';
const roomMessageModel = './roomMessage.model.js';

const User = db.import(UserModel);
const Room = db.import(RoomModel);
const Message = db.import(messageModel);
const RoomMessage = db.import(roomMessageModel);

User.belongsToMany(Room, { as: 'users', through: 'RoomWithUser', foreignKey: 'id' });
Room.belongsToMany(User, { as: 'Rooms', through: 'RoomWithUser', foreignKey: 'id' });
User.belongsToMany(User, { as: 'friends', through: 'UsersFriends', foreignKey: 'id' });
Message.hasOne(User, { as: 'from', foreignKey: 'id' });
Message.hasOne(User, { as: 'to', foreignKey: 'id' });
RoomMessage.hasOne(User, { as: 'from', foreignKey: 'id' });
RoomMessage.hasOne(Room, { as: 'to', foreignKey: 'id' });

db.sync();
module.exports = {
  User,
  Room,
  Message,
  RoomMessage
};
