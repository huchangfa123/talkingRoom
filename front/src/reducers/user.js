import immutable from 'immutable'

const initState = immutable.fromJS({
  messageList: [],
  roomList: []
});

export function user(state = initState, action) {
  switch (action.type) {
    case 'sendMessage': {
      return state.updateIn(['messageList'], list => list.push({
        type: 'OWN_MESSAGE',
        data: action.data
      }))
    }
    case 'getMessage': {
      return state.updateIn(['messageList'], list => list.push({
        type: 'OTHERS_MESSAGE',
        data: action.data
      }))
    }
    case 'addUser': {
      return state.updateIn(['messageList'], list => list.push({
        type: 'TIPS_MESSAGE',
        data: action.data
      }))
    }
    case 'userLeave': {
      return state.updateIn(['messageList'], list => list.push({
        type: 'TIPS_MESSAGE',
        data: action.data
      }))
    }
    case 'userRooms': {
      return state.set('roomList', action.data)
    }
    case 'createRoom': {
      return state.set('roomList', action.data.result.data)
    }
    case 'joinRoom': {
      return state.set('roomList', action.data.result.data)
    }
    case 'resetRoomData': {
      return state.set('messageList', [])
    }
    default:
      return state;
  }
}
