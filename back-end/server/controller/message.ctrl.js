import MessageService from '../services/messageServices'

class MessageController {
  async saveMessage(ctx, next) {
    let result = await MessageService.saveMessage(ctx.request.body)
    ctx.body = {
      code: 200,
      result
    }
  }

  async getRoomMessage(ctx, next) {
    console.log('query', ctx.params)
    let result = await MessageService.getRoomMessage(ctx.params)
    ctx.body = {
      code: 200,
      data: result
    }
  }
}

export default new MessageController()