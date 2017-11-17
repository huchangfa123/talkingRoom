import Store from '../store';

const dispatch = Store.dispatch;

const actions = {
  // iconMenu
  openIconMenu: () => dispatch({ type: 'OpenIconMenu' }),
  closeIconMenu: () => dispatch({ type: 'CloseIconMenu' })
};

export default actions;
