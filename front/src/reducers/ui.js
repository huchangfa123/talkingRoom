import config from '../config';

const initState = {
  showIconMenu: false
};

export function ui(state = initState, action) {
  switch (action.type) {
    case 'OpenIconMenu': {
      state.showIconMenu = true;
      return state;
    }

    case 'CloseIconMenu': {
      state.showIconMenu = false;
      return state;
    }

    default:
      return state;
  }
}
