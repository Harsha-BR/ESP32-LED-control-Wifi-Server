import React, { Component } from 'react';
import logo from './logo.svg';
import Main from "./Components/Main";


import {SnackbarProvider} from 'notistack';

class App extends Component {
  render() {
    return (
      <SnackbarProvider maxSnack={3}>
      <Main />
  </SnackbarProvider>
    );
  }
}

export default App;
