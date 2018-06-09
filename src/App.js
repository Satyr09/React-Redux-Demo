import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';

import PostNew from './components/Posts';
import PostForm from './components/Postform.js';

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
