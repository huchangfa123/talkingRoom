import { OPEN_ICONMENU, CLOSE_ICONMENU } from '../action/UiAction';
import config from '../config';

const initState = {
  showIconMenu: false
};

export function ui(state = initState, action) {
  switch (action.type) {
    case OPEN_ICONMENU: {
      state.showIconMenu = true;
      return state;
    }

    case CLOSE_ICONMENU: {
      state.showIconMenu = false;
      return state;
    }

    default:
      return state;
  }
}
