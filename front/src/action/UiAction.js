import Store from '../store';

const dispatch = Store.dispatch;

const actions = {
  // iconMenu
  openIconMenu: () => dispatch({ type: 'OpenIconMenu' }),
  closeIconMenu: () => dispatch({ type: 'CloseIconMenu' }),

  // sideBar
  joinGroupSide: () => dispatch({ type: 'JoinGroupSide' }),
  createGroupSide: () => dispatch({ type: 'CreateGroupSide' }),
  sideBarClose: () => dispatch({ type: 'CloseSideBar' })
};

export default actions;
