import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Header from './Header';
import Body from './Body';

import store from './redux/store';

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#96d9ca'
  }
};

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div style={ styles.container }>
          <Header />
          <Body />
        </div>
      </Provider>
    );
  }
}

export default App;
