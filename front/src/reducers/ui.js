import config from '../config';
import immutable from 'immutable'

const initState = immutable.fromJS({
  showIconMenu: false,
  sideBarType: null,
  showMaskLayout: false,
  showGroupMessage: false,
  showGroupNotice: false
});

export function ui(state = initState, action) {
  switch (action.type) {
    case 'OpenIconMenu': {
      return state.set('showIconMenu', true);
    }

    case 'CloseIconMenu': {
      return state.set('showIconMenu', false);
    }

    case 'JoinGroupSide': {
      return state.set('sideBarType', 'joinGroup');      
    }

    case 'CreateGroupSide': {
      return state.set('sideBarType', 'createGroup');
    }

    case 'CloseSideBar': {
      return state.set('sideBarType', null);
    }

    case 'ShowMaskLayout': {
      return state.set('showMaskLayout', true);
    }

    case 'CloseMaskLayout': {
      return state.set('showMaskLayout', false);
    }

    case 'ShowGroupMessage': {
      return state.set('showGroupMessage', true);
    }

    case 'CloseGroupMessage': {
      return state.set('showGroupMessage', false);
    }

    case 'ShowGroupNotice': {
      return state.set('showGroupNotice', true);
    }

    case 'CloseGroupNotice': {
      return state.set('showGroupNotice', false);
    }

    default:
      return state;
  }
}
