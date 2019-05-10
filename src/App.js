import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './config/ReactotronConfig';

import store from './store';
import Router from './routes';
import Global from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <Global />
      <Router />
      <ToastContainer autoClose={2000} />
    </Provider>
  );
}

export default App;
