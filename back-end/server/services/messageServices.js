import models from '../model';
import config from '../../config';

const RoomMessage = models.RoomMessage;
const User = models.User;
const Room = models.Room;
class MessageServices {
  /**
   *  把传过来的信息保存
  */
  async saveMessage(data) {
    try {
      console.log('data.type', data)
      const roomMessage = await RoomMessage.create({
        msgType: data.msgType,
        contentType: data.contentType,
        content: data.content,
        time: new Date(data.createdAt),
        createdAt: new Date(data.createdAt)
      })
      // sequlize　设置外键方法　setxxx (xxx：as定义的属性名)
      await roomMessage.setFrom(data.From.id)
      await roomMessage.setTo(data.roomId)
    } catch (error) {
      console.log(error)
      throw Error('信息有误:', error);
    }
  }

  async getRoomMessage(data) {
    try {
      let roomMessage = [];
      let MessageLength = await RoomMessage.count({where: {'toId': data.id}})
      if(data.curFirst !== '0') {
        console.log(1111)
        roomMessage = await RoomMessage.findAll({ 
          where: {'toId': data.id, 'id':{$lt: data.curFirst}},
          limit: 20,
          order: [['createdAt', 'DESC']],
          include: ['From'] 
        })
        roomMessage = roomMessage.reverse();
      } else {
        if(MessageLength > 20) {
          MessageLength = MessageLength - 20;
        } else {
          MessageLength = 0;
        }
        roomMessage = await RoomMessage.findAll({
          offset: MessageLength,
          limit: 20,
          order: [['createdAt', 'ASC']],
          where: {'toId': data.id},
          include: ['From']
        })
      }
      return roomMessage

    } catch (error) {
      console.log(error)
      throw Error('获取失败!')
    }
  }

}

export default new MessageServices();