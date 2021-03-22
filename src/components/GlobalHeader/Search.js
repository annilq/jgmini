import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {

  render() {
    const { onSearch=()=>{} } = this.props;
    return (
      <div className={styles.right}>
        <Icon type="search" />
      </div>
    );
  }
}
