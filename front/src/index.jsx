import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Hello from './components/hello.jsx';
import store from './store';
import Login from './components/login.jsx';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { createBrowserHistory } from 'react-router-redux';

const history = createBrowserHistory(browserHistory, store);
var rootInstance = render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <Route path="login" component={Login}></Route>
        <Route path="chatting" component={Hello}></Route>
      </Route>
    </Router>
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