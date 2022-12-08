import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { unstable_HistoryRouter as BrowserRouter} from 'react-router-dom';

// 导入全局样式
import 'antd-mobile-v2/dist/antd-mobile.css';  
import '@/asset/styles/index.scss';
import {Provider} from 'react-redux';
import store from '@/store';
import history from './utils/history';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
