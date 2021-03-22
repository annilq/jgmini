import React from "react"
import { Provider } from 'react-redux';
import { create } from 'dva-core';
import createLoading from 'dva-loading';
import { useAppEvent } from 'remax/macro';
import 'annar/dist/annar.css';

import initModel from "@/models"
import './app.css';

const app = create(); 
app.use(createLoading());
initModel(app)
app.start(); // 实例初始化

const store = app._store;
const App = props => {
  useAppEvent('onShow', () => {
    console.log('这个 hook 等同于 onShow');
  });
  useAppEvent('onLaunch', () => {
    console.log('这个 hook 等同于 onLaunch');
    const token = wx.getStorageSync('token');
    console.log(token);
  });
  return <Provider store={store}>{props.children}</Provider>
};

export default App;