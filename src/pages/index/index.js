import * as React from 'react';
import { View, Text } from 'remax/wechat';
import { Icon } from 'annar';

import styles from './index.css';

export default () => {
  function goApprove() {
    wx.navigateTo({
      url: '/pages/work/index',
    })
  }
  function goTask() {

  }
  function addFlow() {

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
    </View>
  );
};
