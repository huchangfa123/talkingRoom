import immutable from 'immutable'

const initState = immutable.fromJS({
  messageList: [],
  roomList: []
});

export function user(state = initState, action) {
  switch (action.type) {
    case 'send-message': {
      return state.updateIn(['messageList'], list => list.push({
        type: 'OWN_MESSAGE',
        data: action.data
      }))
    }
    case 'get-message': {
      return state.updateIn(['messageList'], list => list.push({
        type: 'OTHERS_MESSAGE',
        data: action.data
      }))
    }
    case 'add-user': {
      return state.updateIn(['messageList'], list => list.push({
        type: 'TIPS_MESSAGE',
        data: action.data
      }))
    }
    case 'user-leave': {
      return state.updateIn(['messageList'], list => list.push({
        type: 'TIPS_MESSAGE',
        data: action.data
      }))
    }
    case 'user-rooms': {
      console.log('user-rooms', action.data)
      return state.set('roomList', action.data)
    }
    case 'create-room': {
      console.log('create-room', action.data)
      return state.set('roomList', action.data.result.data)
    }
    case 'join-room': {
      console.log('join-room', action.data.result.data)      
      return state.set('roomList', action.data.result.data)
    }
    default:
      return state;
  }
}
