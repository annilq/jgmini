import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { Icon } from 'antd';
import styles from './index.less';

@withRouter
export default class GlobalHeaderLeft extends PureComponent {
  render() {
    const { history } = this.props;
    return (
      <div className={styles.left} onClick={() => history.goBack()}>
        <Icon type="left" />
      </div>
    );
  }
}
