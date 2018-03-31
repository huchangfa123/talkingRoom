import immutable, { isImmutable } from 'immutable'

const initState = immutable.fromJS({
  messageList: [],
  roomList: [],
  curSelectedRoom: {}
});

export function user(state = initState, action) {
  switch (action.type) {
    case 'getMessage': {
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
            let userIndex = m.findIndex(user => user.get('id') === action.user.id)
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
        messageList => messageList.map((item, index) => {
          return item.updateIn(['messages'], messages => messages.push(immutable.fromJS({
            msgType: 'TIPS_MESSAGE',
            data: action.data
          })))
        })
      ).updateIn(
        ['roomList'],
        roomList => roomList.map((room, index) => {
          return room.updateIn(['onlineUsers'], 
            onlineUsers => onlineUsers.delete(onlineUsers.findIndex(user => user.get('id') === action.data.userId))
          )
        })
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
      return state.set('messageList', immutable.fromJS(messageList))
                  .set('roomList', immutable.fromJS(action.data))
    }

    case 'createRoom': {
      return state.updateIn(
        ['roomList'],
        roomList => roomList.unshift(immutable.fromJS(Object.assign(action.data.data, {onlineUsers: []})))
      )
    }

    case 'joinRoom': {
      return state.updateIn(
        ['roomList'],
        roomList => roomList.unshift(immutable.fromJS(Object.assign(action.data.data)))
      )
    }

    case 'userLeaveRoom': {
      
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
      const roomIndex = roomList.findIndex(g => g.get('id') === action.data)
      return state.set('curSelectedRoom', roomList.get(roomIndex))
    }
    default:
      return state;
  }
}
