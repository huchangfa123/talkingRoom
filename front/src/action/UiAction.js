export const OPEN_ICONMENU = 'open-iconmenu';
export const CLOSE_ICONMENU = 'close-iconmenu';

/**
 *  打开、关闭菜单栏
*/
export function openIconMenu() {
  return dispatch => {
    dispatch({
      type: OPEN_ICONMENU
    });
  };
}

export function closeIconMenu() {
  return dispatch => {
    dispatch({
      type: CLOSE_ICONMENU
    });
  };
}
