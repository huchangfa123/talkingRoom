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
        content: data.message,
        time: data.time
      })
      // sequlize　设置外键方法　setxxx (xxx：as定义的属性名)
      await roomMessage.setFrom(data.userId)
      await roomMessage.setTo(data.roomId)
    } catch (error) {
      console.log(error)
      throw Error('信息有误:', error);
    }
  }

  async getRoomMessage(data) {
    try {
      const roomMessage = await RoomMessage.findAll({ where: {'toId': data.roomId} })
      return roomMessage
    } catch (error) {
      console.log(error)
      throw Error('获取失败!')
    }
  }

}

export default new MessageServices();