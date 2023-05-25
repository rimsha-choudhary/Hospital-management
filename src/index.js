import React from 'react';
import App from './App';
import store from "./store";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);