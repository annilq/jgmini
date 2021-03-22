import React from 'react';
import styles from './index.less';

export default ({ title, children, ...rest }) => (
  <div className={styles.contaner} {...rest}>
    <div className={styles.linearLeft} />
    <div className={styles.title}>{title}</div>
    <div className={styles.linearRight} />
    {children}
  </div>
);
