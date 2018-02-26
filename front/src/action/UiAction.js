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
  showGroupMessage: () => dispatch({ type: 'ShowGroupMessage' }),
  closeGroupMessage: () => dispatch({ type: 'CloseGroupMessage' }),

  // groupNotice
  showGroupNotice: () => dispatch({ type: 'ShowGroupNotice' }),
  closeGroupNotice: () => dispatch({ type: 'CloseGroupNotice' }),

  // getInRoom
  getInRoom: () => dispatch({ type: 'GetInRoom'}),
  getOutRoom: () => dispatch({ type: 'GetOutRoom'})  
}

export default actions;
