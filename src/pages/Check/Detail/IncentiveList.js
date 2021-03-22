import React from 'react';
import SectionHeader from '@/components/SectionHeader';

import Detail from '@/components/CustomForm/detail/combine';
import useFormConfig from '@/hooks/useFormConfig';
import styles from './index.less';

function Incentivelist(props) {
  const { data = [] } = props;
  const { tableConfig: config } = useFormConfig('Incentive');
  if (!config) {
    return false;
  }
  return (
    <div className={styles.incentItem}>
      <div style={{ padding: "0 20px" }}>
        <SectionHeader
          title="奖惩记录"
          style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
        />
      </div>
      {data.map(item => (
        <Detail item={item} key={item.id} containers={config.containers} formCode="Incentive" />
      ))}
    </div>
  );
}

export default Incentivelist;
