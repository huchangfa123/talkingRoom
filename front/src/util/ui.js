import actions from '../action/UiAction';

export function closeAllWindows() {
  for (let value in actions) {
    if (value && value.toString().startsWith('close')) {
      actions[value]();
    }
  }
}
