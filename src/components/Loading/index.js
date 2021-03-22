import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

/**
 * Loading
 * @author hmy
 *
 * @param loading
 * @param loadingText
 * @param children
 */
function Loading({ loading, loadingText, children }) {
  return (
    <Spin wrapperClassName={styles.loading} spinning={loading} tip={loadingText}>
      {children}
    </Spin>
  );
}

export default Loading;
