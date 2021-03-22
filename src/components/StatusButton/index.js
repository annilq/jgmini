import React from 'react';
import { DataSelecter } from '@/components/CustomForm';
import cx from 'classnames';

import styles from './index.less';

function StatusButton(props) {
  const { data = {} } = props;
  return (
    <DataSelecter
      extraProps={{
        flag: 'inspectStatusMap',
        // flag: 'inspectReformStatusMap',
        type: 2,
      }}
    >
      {candidates => {
        const obj = candidates.find(item => item.value == data.judgeType);
        let styleType = 'status1';
        switch (parseInt(data.judgeType, 10)) {
          case 1:
            styleType = 'status1';
            break;
          case 2:
            styleType = 'status2';
            break;
          case 3:
            styleType = 'status3';
            break;
          default:
            break;
        }
        return obj && <div className={cx(styles.statusButton, styles[styleType])}>{obj.label}</div>;
      }}
    </DataSelecter>
  );
}

export function ReformStatusButton(props) {
  const { data = {} } = props;
  return (
    <DataSelecter
      extraProps={{
        flag: 'inspectReformStatusMap',
        type: 2,
      }}
    >
      {candidates => {
        const obj = candidates.find(item => item.value == data.status);
        let styleType = 'status1';
        switch (parseInt(data.status, 10)) {
          case 0:
            styleType = 'status2';
            break;
          case 1:
            styleType = 'status4';
            break;
          case 2:
            styleType = 'status1';
            break;
          case 3:
            styleType = 'status3';
            break;
          default:
            break;
        }
        return obj && <div className={cx(styles.statusButton, styles[styleType])}>{obj.label}</div>;
      }}
    </DataSelecter>
  );
}

export default StatusButton;
