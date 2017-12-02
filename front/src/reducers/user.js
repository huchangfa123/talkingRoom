const initState = {
  messageList: []
};

export function user(state = initState, action) {
  switch (action.type) {
    case 'send-message': {
      state.messageList.push({
        type: 'OWN_MESSAGE',
        data: action.data
      });
      return state;
    }
    case 'get-message': {
      state.messageList.push({
        type: 'OTHERS_MESSAGE',
        data: action.data
      });
      return state;
    }
    case 'add-user': {
      state.messageList.push({
        type: 'TIPS_MESSAGE',
        data: action.data
      });
      return state;
    }
    case 'user-leave': {
      state.messageList.push({
        type: 'TIPS_MESSAGE',
        data: action.data
      });
      return state;
    }
    default:
      return state;
  }
}
