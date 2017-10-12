import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxHello } from './components/hello.jsx';
import store from './store';

var rootInstance = render(
  <Provider store={store}>
    <ReduxHello />
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      // 帮助 React Hot Loader 识别出页面中的根组件
      return [rootInstance];
    }
  });
}