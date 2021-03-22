import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Divider, Icon } from 'antd';
import { getPageName } from '@/utils/getPageTitle';

import styles from './index.less';
import Search from './Search';
import Back from './back';

@connect(({ menu }) => ({
  breadcrumbNameMap: menu.breadcrumbNameMap,
}))
@withRouter
export default class GlobalHeader extends PureComponent {
  render() {
    const { collapsed, logo, currentUser = {}, location: { pathname }, breadcrumbNameMap, children } = this.props;
    const title = getPageName(pathname, breadcrumbNameMap);
    return (
      <div className={styles.header}>
        <span>{title}</span>
        {children}
      </div>
    );
  }
}
