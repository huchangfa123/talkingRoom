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
  getOutRoom: () => dispatch({ type: 'GetOutRoom'}),

  // playsound
  playSound: () => dispatch({type: 'PlaySound'}),
  notPlaySound: () => dispatch({type: 'CloseSound'}),

  // DesktopNotification
  openDesktopNotification: () => dispatch({type: 'OpenDesktopNotification'}),
  notOpenDesktopNotification: () => dispatch({type: 'CloseDesktopNotification'}),

  // SoundNotification
  openSoundNotification: () => dispatch({type: 'OpenSoundNotification'}),
  notOpenSoundNotification: () => dispatch({type: 'CloseSoundNotification'})

}

export default actions;
