import 'react-app-polyfill/ie9';

import { Component } from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';

// import configureStore from './config/redux/configureStore';
import configureStore from './redux/store';

// create store object
const store = configureStore();

/**
 *  Specify global styles for application
 *  Normally, styled components are automatically
 *  scoped to a local CSS class and therefore isolated
 *  from other components.
 *  In the case of createGlobalStyle, this limitation
 *  is removed and things like CSS resets
 *  or base stylesheets can be applied.
 */
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    outline: 0;
  }

  html,
  body {
      margin: 0;
      padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
  }

  body,
  .application {
    position: relative;
  }
`;

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}

render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
