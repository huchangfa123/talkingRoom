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
        content: data.content,
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
      console.log('data', data)
      const roomMessage = await RoomMessage.findAll({ where: {'toId': data.id}, include: ['From'] })
      return roomMessage

    } catch (error) {
      console.log(error)
      throw Error('获取失败!')
    }
  }

}

export default new MessageServices();