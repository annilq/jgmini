import React from 'react';
import cx from 'classnames';

import styles from '@/components/StatusButton/index.less';

function StatusButton(props) {
  // 1-通过
  // 2-口头警告
  // 3-书面整改（未发）
  // 4-书面整改（已发）
  const { data } = props;
  let styleType = 'pass';
  let styleText = '';
  switch (parseInt(data, 10)) {
    case 2:
      styleType = 'status4';
      styleText = '开始检查';
      break;
    case 1:
      styleType = 'status0';
      styleText = '未开始';
      break;
    case 3:
      styleType = 'status1';
      styleText = '检查通过';
      break;
    default:
      break;
  }
  return <div className={cx(styles.statusButton, styles[styleType])}>{styleText}</div>;
}

export default StatusButton;
