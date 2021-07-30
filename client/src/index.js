import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './utils/GlobalStore';

import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#11cb5f',
    },
    secondary: {
      main: '#651fff',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    {' '}
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <App />{' '}
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

reportWebVitals();
