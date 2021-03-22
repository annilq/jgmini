/* eslint-disable compat/compat */
import React from 'react';
import { connect } from 'react-redux';
import {useNativeEffect } from 'remax';
// 组件初始化的时候从url上面拿到token，设置到localStorage,后续跳转一律从localstorage中取值
function AuthComponent({ children, dispatch }) {
  // 01 经营版  02 项目版 03 用户中心 04 任务管理 05 自定义菜单 06 项目版公司级别 07 项目版项目级别
  // 外部进入
  const token = wx.getStorageSync('token');
    // 移动端默认为公司级别
    wx.setStorageSync('app-code', '06');
    useNativeEffect(
    () => {
      if (query.token) {
        // 在这里分发token
        dispatch({
          type: 'account/token',
          payload: query.token,
        })
      } else {
        dispatch({
          type: 'account/logout'
        })
      }
    },
    []
  );
  if (!token) {
    return "未登录";
  }

  return <div key={token}> {children}</div>;
}

export default connect(({ account }) => ({
  token: account.token,
}))(AuthComponent);
