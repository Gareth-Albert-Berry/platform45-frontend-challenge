import React, { Component } from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer/Drawer'
import App from '../views/App.js'

export const DEFAULT = "default"

export const defaultTheme = {
  name: DEFAULT,
  palette: {
    primary: { main: "#32485c" },
    secondary: { main: '#cbbe34' },
    error: { main: '#ff111b'},
    white: {main: "#fff"}
  },
  typography: {
    fontFamily: `'Roboto', sans-serif`,
    useNextVariants: true,
  },
}

const theme = createMuiTheme(defaultTheme);

class AppContainer extends Component {
  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>

    );
  }
}

export default AppContainer;
