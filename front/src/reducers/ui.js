import config from '../config';

const initState = {
  showIconMenu: false,
  sideBarType: null,
  showMaskLayout: false,
  showGroupMessage: false,
  showGroupNotice: false
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

    case 'ShowMaskLayout': {
      state.showMaskLayout = true;
      return state;
    }

    case 'CloseMaskLayout': {
      state.closeMaskLayout = false;
      return state;
    }

    case 'ShowGroupMessage': {
      state.showGroupMessage = true;
      return state;
    }

    case 'CloseGroupMessage': {
      state.showGroupMessage = false;
      return state;
    }

    case 'ShowGroupNotice': {
      state.showGroupNotice = true;
      return state;
    }

    case 'CloseGroupNotice': {
      state.showGroupNotice = false;
      return state;
    }

    default:
      return state;
  }
}
