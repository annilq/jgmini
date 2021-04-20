import React, { useState } from 'react';
import { usePageEvent } from 'remax/macro';
import { View } from 'remax/wechat';
import { Icon, Popup } from 'annar';

import styles from './index.css';
import FlowItem from './flowItem';

export default () => {
  const [menus, setMenus] = useState([])
  const [show, setShow] = useState(false);
  const [subMenu, setSubMenu] = useState({ children: [] });
  usePageEvent('onShow', () => {
    console.log('on show');
    const menus = wx.getStorageSync('menu') || [];
    setMenus(menus)
  });

  function goApprove() {
    wx.navigateTo({
      url: '/pages/work/index',
    })
  }

  function goTask() {

  }

  function addFlow() {
  }

  function goFlowList(flow) {
    console.log(flow.url);
    wx.navigateTo({
      url: `/pages/flowlist/index?path=${flow.url}`
    })
  }

  function handleClick(flow) {
    if (flow.children.length > 0) {
      setShow(true);
      setSubMenu(flow)
    } else {
      goFlowList(flow)
    }
  }
  return (
    <View>
      <View className={styles.header}>
        <View className={styles.menuItem} onTap={goApprove}>
          <Icon type="profile" size="72" color="#fff" />
          <View>待我审批</View>
        </View>
        <View className={styles.menuItem} onTap={goTask}>
          <Icon type="send" size="72" color="#fff" />
          <View>任务</View>
        </View>
        <View className={styles.menuItem} onTap={addFlow}>
          <Icon type="edit" size="72" color="#fff" />
          <View>新建流程</View>
        </View>
      </View>
      <View className={styles.menuList}>
        {menus.map((menuItem) => (
          <FlowItem data={menuItem} handleClick={handleClick} />
        ))}
      </View>
      <Popup
        position="bottom"
        open={show}
        onClose={() => {
          setShow(false);
        }}
      >
        <View
          style={{
            padding: '24px',
          }}
          className={styles.menuList}
        >
          <FlowItem data={subMenu} handleClick={handleClick} />
        </View>
      </Popup>
    </View>
  );
};
