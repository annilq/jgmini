import React from 'react';
import styles from './index.less';

/**
 * SectionHeader 组件
 * @author hmy
 * @description 区域头部标题
 */
export default ({ title, children, ...rest }) => (
  <div className={styles.sectionHeader} {...rest}>
    {title} {children}
  </div>
);

export function SectionHeader2({ title, children, ...rest }) {
  return (
    <div className={styles.sectionHeader2} {...rest}>
      {title} {children}
    </div>
  );
}
