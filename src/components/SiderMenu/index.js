import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';
import AppMenu from './AppMenu';
import { getFlatMenuKeys } from './SiderMenuUtils';
import styles from './index.less';

/**
 * @author hmy
 * @desc  对框架布局有定制设计，因此保留v2版本
 */
const SiderMenuWrapper = React.memo(props => {
  const { isMobile, menuData, collapsed, appCollapsed, onCollapse, onAppCollapse } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return (
    <>
      {isMobile ? (
        <Drawer
          visible={!collapsed}
          placement="left"
          width={160}
          onClose={() => onCollapse(true)}
          style={{
            padding: 0,
            height: '100vh',
          }}
        >
          <SiderMenu
            {...props}
            flatMenuKeys={flatMenuKeys}
            collapsed={isMobile ? false : collapsed}
          />
        </Drawer>
      ) : (
        <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
      )}
      <Drawer
        visible={!appCollapsed}
        placement="left"
        width={220}
        closable={false}
        onClose={() => onAppCollapse(true)}
        style={{
          height: '100vh',
          zIndex: '10',
        }}
        className={styles.appMenu}
      >
        <AppMenu />
      </Drawer>
    </>
  );
});

export default SiderMenuWrapper;
