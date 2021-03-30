import React, { useState } from 'react';
import { usePageEvent } from 'remax/macro';
import { View, Text } from 'remax/wechat';
import { Icon } from 'annar';

import styles from './index.css';

export default () => {
  const [menus, setMenus] = useState([])
  usePageEvent('onShow', () => {
    console.log('on show');
    const menus = wx.getStorageSync('menu')||[];
    setMenus(menus)
  });
  function goApprove() {
    wx.navigateTo({
      url: '/pages/work/index',
    })
  }
  function goTask() {

  }

  function addFlow(flow) {
    console.log(flow);
    wx.navigateTo({
      url: `/pages/flowlist/index?path=${flow.url}`
    })
  }
  console.log(menus);
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
          <>
            <View className={styles.menuTitle}>
              <Text> {menuItem.menuName}</Text>
            </View>
            <View className={styles.menuGroup}>
              {menuItem.children.map(item => (
                <View className={styles.menuGroupItem} key={item.menuCode} onTap={() => addFlow(item)}>
                  <Text> {item.menuName}</Text>
                </View>))}
            </View>
          </>
        ))}
      </View>
    </View>
  );
};
