import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material';

import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

import './index.css';
import axios from 'axios';

axios.interceptors.request.use(
  config => {
    if (config && config.headers) {
      config.headers["Access-Control-Allow-Origin"] = "*";
    }
    return config
  }
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <App />
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
