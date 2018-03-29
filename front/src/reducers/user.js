import immutable, { isImmutable } from 'immutable'

const initState = immutable.fromJS({
  messageList: [],
  roomList: [],
  curSelectedRoom: {}
});

export function user(state = initState, action) {
  switch (action.type) {
    case 'getMessage': {
      console.log('action.data', action.data)
      return state.updateIn(
        ['messageList'],
        messageList => {
          const roomIndex = messageList.findIndex(g => g.get('roomId') === action.data.roomId);
          return messageList.updateIn([roomIndex, 'messages'], m => m.push(immutable.fromJS(action.data)))
        }
      )
    }
    case 'addUser': {
      return state.updateIn(
        ['messageList'],
        messageList => {
          const roomIndex = messageList.findIndex(g => g.get('roomId') === action.roomId)
          return messageList.updateIn([roomIndex, 'messages'], m => m.push(immutable.fromJS({
            msgType: 'TIPS_MESSAGE',
            data: action.data
          })))
        }
      )
    }
    case 'userLeave': {
      return state.updateIn(
        ['messageList'],
        messageList => {
          const roomIndex = messageList.findIndex(g => g.get('roomId') === action.roomId)
          return messageList.updateIn([roomIndex, 'messages'], m => m.push(immutable.fromJS({
            msgType: 'TIPS_MESSAGE',
            data: action.data
          })))
        }
      )
    }

    case 'setRoomsAndMessagesList': {
      let messageList = []
      for(let room of action.data) {
        messageList.push({
          roomId: room.id,
          messages: []
        })
      }
      return state.set('roomList', immutable.fromJS(action.data))
                  .set('messageList', immutable.fromJS(messageList))
    }

    case 'createRoom': {
      return state.set('roomList', action.data.result.data)
    }

    case 'joinRoom': {
      console.log('action.data.result', action.data)
      return state.set('roomList', action.data.result.data)
    }

    case 'getRoomMessage': {
      return state.updateIn(
        ['messageList'],
        messageList => {
          const roomIndex = messageList.findIndex(g => g.get('roomId') === action.roomId)
          return messageList.updateIn(
            [roomIndex, 'messages'],
            messages => immutable.fromJS(action.data.data)
          )
        }
      )
    }

    case 'setCurRoom': {
      let roomList = state.get('roomList')
      let curRoom = {}
      const roomIndex = roomList.findIndex(g => g.get('id') === action.data)
      return state.set('curSelectedRoom', roomList.get(roomIndex))
    }
    default:
      return state;
  }
}
