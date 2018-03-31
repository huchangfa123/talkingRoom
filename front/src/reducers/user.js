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
        ['roomList'], 
        roomList => {
          const roomIndex = roomList.findIndex(g => g.get('id') === action.roomId)
          return roomList.updateIn([roomIndex, 'onlineUsers'], m => {
            console.log('action.user.id', action.user.id)
            m.findIndex(user => console.log(user.get('id')))
            let userIndex = m.findIndex(user => user.get('id') === action.user.id)
            console.log('userIndex', userIndex)
            if (userIndex === -1) {
              return m.push(immutable.fromJS(action.user))
            } 
            return m;
          })
        }
      ).updateIn(
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
      let roomList = []
      console.log('action.data', action.data)
      for(let room of action.data) {
        messageList.push({
          roomId: room.id,
          messages: []
        })
      }
      return state.set('messageList', immutable.fromJS(messageList))
                  .set('roomList', immutable.fromJS(action.data))
    }

    case 'createRoom': {
      return state.updateIn(
        ['roomList'],
        roomList => roomList.push(immutable.fromJS(Object.assign(action.data.result.data, {onlineUsers: []})))
      )
      // return state.set('roomList', immutable.fromJS(action.data.result.data))
    }

    case 'joinRoom': {
      return state.set('roomList', immutable.fromJS(action.data.result.data))
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
