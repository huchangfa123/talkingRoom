import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Main from './components/main';
import store from './store';
import Login from './components/login';
import chatting from './components/chatting';
import setting from './components/setting';
import './assert/css/app.css';
import { Route, BrowserRouter } from 'react-router-dom';
import { closeAllWindows } from './util/ui';

var rootInstance = render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/main" component={Main} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function() {
      // Help React Hot Loader figure out the root component instances on the page:
      // 帮助 React Hot Loader 识别出页面中的根组件
      return [rootInstance];
    }
  });
}
