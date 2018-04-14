import immutable from 'immutable'
import { setDesktopNotification } from '../config'

const initState = immutable.fromJS({
  showIconMenu: false,
  sideBarType: null,
  showMaskLayout: false,
  showGroupMessage: false,
  showGroupNotice: false,
  getInRoom: false,
  playSound: false,
  soundNotification: true,
  desktopNotification: true
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

    case 'GetInRoom': {
      return state.set('getInRoom', true);
    }

    case 'GetOutRoom': {
      return state.set('getInRoom', false);
    }

    case 'PlaySound': {
      return state.set('playSound', true);
    }

    case 'CloseSound': {
      return state.set('playSound', false);    
    }
    
    case 'OpenSoundNotification': {
      return state.set('soundNotification', true)
    }

    case 'CloseSoundNotification': {
      return state.set('soundNotification', false)
    }

    case 'OpenDesktopNotification': {
      setDesktopNotification(true);
      return state.set('desktopNotification', true)
    }

    case 'CloseDesktopNotification': {
      setDesktopNotification(false);      
      return state.set('desktopNotification', false)
    }

    default:
      return state;
  }
}
