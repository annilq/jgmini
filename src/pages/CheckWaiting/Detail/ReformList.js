import React from 'react';
import SectionHeader from '@/components/SectionHeader';

import Detail from '@/components/CustomForm/detail/combine';
import useFormConfig from '@/hooks/useFormConfig';
import styles from './index.less';

function ReformList(props) {
  const { data = [] } = props;
  const { tableConfig: config } = useFormConfig('Reform');
  if (!config) {
    return false;
  }
  return (
    <div style={{ backgroundColor: '#fff', padding: "0 20px", marginTop: "10px" }}>
      <SectionHeader
        title="整改记录"
        style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
      />
      {data.map((item, index) => (
        <div className={styles.incentItem} style={{ ...index !== 0 && { "borderTop": "1px dashed #e9e9e9" } }}>
          <Detail item={item} key={item.id} containers={config.containers} formCode="Reform" />
        </div>
      ))}
    </div>
  );
}

export default ReformList;
