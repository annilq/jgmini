import React, { PureComponent } from 'react';
import RightContent from '../GlobalHeader/RightContent';
import LeftContent from '../GlobalHeader/LeftContent';
import ProjectSwitch from '@/components/ProjectSwitch';

import BaseMenu from '../SiderMenu/BaseMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import styles from './index.less';

export default class TopNavHeader extends PureComponent {
  state = {
    maxWidth: undefined,
  };

  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40,
    };
  }

  render() {
    const { theme, contentWidth, menuData, logo, currentUser = {} } = this.props;
    const { maxWidth } = this.state;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return (
      <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}
        >
          <LeftContent {...this.props} />
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <img src={currentUser.tenantLogoUrl || logo} alt="logo" />
              {/* <h1>{currentUser.loginName || '广州建管网络科技有限公司'}</h1> */}
            </div>
            <div
              style={{
                maxWidth,
              }}
            >
              <BaseMenu {...this.props} flatMenuKeys={flatMenuKeys} className={styles.menu} />
            </div>
          </div>
          <ProjectSwitch />
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}
