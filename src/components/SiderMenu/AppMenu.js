import React, { PureComponent } from 'react';
import { Menu } from 'antd';
import IconFont from '@/components/IconFont';
import { connect } from 'react-redux';
import { getAppIcon } from '@/utils/utils';

class AppMenu extends PureComponent {
  handleMenuClick = ({ key }) => {
    const token = localStorage.getItem('token');
    // 应用跳转
    window.opener = null;
    window.open(`${key}?appId=TASK&token=${token}`, '_blank');
    // window.location.replace(`${key}?appId=TASK&token=${token}`);
    // window.open(`http://localhost:8001/#/account/profile?appId=TASK&token=${token}`,'_blank');
  };

  render() {
    const { currentUser = {} } = this.props;
    let { apps = [] } = currentUser;
    apps = apps.filter(item => item.appCode !== 'TASK' && item.appCode !== 'CUSTOMIZE_FlOW');

    return (
      <Menu onClick={this.handleMenuClick} selectable={false}>
        {apps.map(item => (
          <Menu.Item key={item.appUrl}>
            <IconFont icon={getAppIcon(item.appCode)} />
            <span>{item.appName}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default connect(({ account }) => ({
  currentUser: account.user,
}))(AppMenu);
