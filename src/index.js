import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { store } from './app/store.js';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Loader from './components/Loader/Loader.jsx';
// styles
import './global.css';
import './styles/index.scss';

const app = document.getElementById('app');

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  app
);

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('Production mode');
}
