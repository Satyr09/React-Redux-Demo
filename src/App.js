import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import PostNew from './components/Posts';

import store from './store';

class App extends Component {





  render() {
    return (
      <Provider store={store}>
      <div className="App" style={{height:'100%'}}>
      

        <PostNew/>
      </div>
      </Provider>
    );
  }
}

export default App;
