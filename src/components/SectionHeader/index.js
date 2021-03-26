import React from 'react';
import { View } from "remax/wechat"
import styles from './index.less';

/**
 * SectionHeader 组件
 * @author hmy
 * @description 区域头部标题
 */
export default ({ title, children, ...rest }) => (
  <View className={styles.sectionHeader} {...rest}>
    {title} {children}
  </View>
);

export function SectionHeader2({ title, children, ...rest }) {
  return (
    <View className={styles.sectionHeader2} {...rest}>
      {title} {children}
    </View>
  );
}
