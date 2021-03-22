import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CloseCircleOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';

import { conversionBreadcrumbString } from '@/components/PageHeaderWrapper/breadcrumb';
import styles from './index.less';

@withRouter
@connect(({ menu }) => ({
  breadcrumbNameMap: menu.breadcrumbNameMap,
}))
class LayerHeader extends PureComponent {
  render() {
    const { onClose, breadcrumbNameMap, ...rest } = this.props;
    const title = conversionBreadcrumbString({ ...rest, breadcrumbNameMap }) + '详情';
    return (
      <div className={styles['layer-header']}>
        <div>{title}</div>
        <div className={styles['button-wrapper']}>
          <div onClick={onClose}>
            <CloseCircleOutlined />
            关闭
          </div>
        </div>
      </div>
    );
  }
}
export default LayerHeader;
