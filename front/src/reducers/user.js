import immutable from 'immutable'

const initState = immutable.fromJS({
  messageList: [],
  roomList: [],
  curSelectedRoom: {}
});

export function user(state = initState, action) {
  switch (action.type) {
    case 'getMessage': {
      let messageList = state.get('messageList')
      messageList.push(action.data)
      return state.set('messageList', JSON.parse(JSON.stringify(messageList)))
    }
    case 'addUser': {
      let messageList = state.get('messageList')
      messageList.push({
        msgType: 'TIPS_MESSAGE',
        data: action.data
      })
      return state.set('messageList', messageList)
    }
    case 'userLeave': {
      let messageList = state.get('messageList')
      messageList.push({
        msgType: 'TIPS_MESSAGE',
        data: action.data
      })
      return state.set('messageList', messageList)
    }
    case 'userRooms': {
      return state.set('roomList', action.data)
    }
    case 'createRoom': {
      return state.set('roomList', action.data.result.data)
    }
    case 'joinRoom': {
      console.log('action.data.result', action.data)
      return state.set('roomList', action.data.result.data)
    }
    case 'resetRoomData': {
      return state.set('messageList', [])
    }
    case 'getRoomMessage': {
      return state.set('messageList', action.data.data)
    }
    case 'setCurRoom': {
      let roomList = state.get('roomList')
      let curRoom = {}
      for(let room of roomList) {
        if(room.id === action.data) {
          curRoom = room;
        }
      }
      return state.set('curSelectedRoom', curRoom)
    }
    default:
      return state;
  }
}
