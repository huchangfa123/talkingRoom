import _ from 'lodash';

const initState = {
  messageList: [],
  itemList: []
};

export function user(state = initState, action) {
  switch (action.type) {
    case 'send-message': {
      state.messageList.push({
        type: 'OWN_MESSAGE',
        data: action.data
      });
      return _.cloneDeep(state);
    }
    case 'get-message': {
      state.messageList.push({
        type: 'OTHERS_MESSAGE',
        data: action.data
      });
      return _.cloneDeep(state);
    }
    case 'add-user': {
      state.messageList.push({
        type: 'TIPS_MESSAGE',
        data: action.data
      });
      return _.cloneDeep(state);
    }
    case 'user-leave': {
      state.messageList.push({
        type: 'TIPS_MESSAGE',
        data: action.data
      });
      return _.cloneDeep(state);
    }
    case 'user-rooms': {
      state.itemList = action.data;
      return _.cloneDeep(state);
    }
    case 'create-room': {
      if (action.data.code === 200) {
        state.itemList = action.data.result.data;
      }
      return _.cloneDeep(state);
    }
    case 'join-room': {
      if (action.data.code === 200) {
        state.itemList = action.data.result.data;
      }
      return _.cloneDeep(state);
    }
    default:
      return state;
  }
}
