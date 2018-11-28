import React, { Component } from 'react';
import Routes from './Routes';
import store from './store';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { light } from './themes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={light}>
          <div className="App">
            <Routes />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
