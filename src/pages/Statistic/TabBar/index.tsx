import React from 'react';
import styles from "./index.less"

const renderTabBar = (props, DefaultTabBar) => {
  return (
    <DefaultTabBar {...props}>
      {node => (
        <div key={node.key} className={styles.tabbar}>
          {node}
        </div>
      )}
    </DefaultTabBar>
  )
};

export default renderTabBar