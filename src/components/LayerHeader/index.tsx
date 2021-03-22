import React, { PureComponent } from 'react';
import { Icon } from 'antd';

import styles from './index.less';

class LayerHeader extends PureComponent<any> {
  render() {
    const { onClose, children, data = {}, title } = this.props;
    return (
      <div className={styles['layer-header']} style={{ textAlign: 'center' }}>
        {children}
        <div onClick={onClose} style={{ position: 'absolute' }}>
          <Icon type="left" />
        </div>
        <div style={{ flex: '1' }}>{title || data.name || '详情'}</div>
      </div>
    );
  }
}
export default LayerHeader;
