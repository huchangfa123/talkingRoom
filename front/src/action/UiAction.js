import Store from '../store';

const dispatch = Store.dispatch;

const actions = {
  // iconMenu
  openIconMenu: () => dispatch({ type: 'OpenIconMenu' }),
  closeIconMenu: () => dispatch({ type: 'CloseIconMenu' }),

  // sideBar
  joinGroupSide: () => dispatch({ type: 'JoinGroupSide' }),
  createGroupSide: () => dispatch({ type: 'CreateGroupSide' }),
  sideBarClose: () => dispatch({ type: 'CloseSideBar' }),

  // MaskLayout
  showMaskLayout: () => dispatch({ type: 'ShowMaskLayout' }),
  closeMaskLayout: () => dispatch({ type: 'CloseMaskLayout' }),

  // groupMessage
  showGroupMessage: () => dispatch({ type: 'showGroupMessage' }),
  closeGroupMessage: () => dispatch({ type: 'closeGroupMessage' }),

  // groupNotice
  showGroupNotice: () => dispatch({ type: 'showGroupNotice' }),
  closeGroupNotice: () => dispatch({ type: 'closeGroupNotice' })
};

export default actions;
