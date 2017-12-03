import config from '../config';
import _ from 'lodash';

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
      return _.cloneDeep(state);
    }

    case 'CloseIconMenu': {
      state.showIconMenu = false;
      return _.cloneDeep(state);
    }

    case 'JoinGroupSide': {
      state.sideBarType = 'joinGroup';
      return _.cloneDeep(state);
    }

    case 'CreateGroupSide': {
      state.sideBarType = 'createGroup';
      return _.cloneDeep(state);
    }

    case 'CloseSideBar': {
      state.sideBarType = null;
      return _.cloneDeep(state);
    }

    case 'ShowMaskLayout': {
      state.showMaskLayout = true;
      return _.cloneDeep(state);
    }

    case 'CloseMaskLayout': {
      state.showMaskLayout = false;
      return _.cloneDeep(state);
    }

    case 'ShowGroupMessage': {
      state.showGroupMessage = true;
      return _.cloneDeep(state);
    }

    case 'CloseGroupMessage': {
      state.showGroupMessage = false;
      return _.cloneDeep(state);
    }

    case 'ShowGroupNotice': {
      state.showGroupNotice = true;
      return _.cloneDeep(state);
    }

    case 'CloseGroupNotice': {
      state.showGroupNotice = false;
      return _.cloneDeep(state);
    }

    default:
      return state;
  }
}
