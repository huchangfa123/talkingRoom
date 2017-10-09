import React from 'react';
import { render } from 'react-dom';
import Hello from './components/hello.jsx';

var rootInstance = render(
  <Hello />, 
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