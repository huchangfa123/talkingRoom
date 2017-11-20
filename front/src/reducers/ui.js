import config from '../config';

const initState = {
  showIconMenu: false,
  sideBarType: null
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

    case 'JoinGroupSide': {
      state.sideBarType = 'joinGroup';
      return state;
    }

    case 'CreateGroupSide': {
      state.sideBarType = 'createGroup';
      return state;
    }

    case 'CloseSideBar': {
      state.sideBarType = null;
      return state;
    }

    default:
      return state;
  }
}
