import React from 'react';
import SectionHeader from '@/components/SectionHeader';

import CheckEdit from './edit';

function Main(props) {
  const { data = [], formCode } = props;
  return (
    <div className="containers">
      <SectionHeader
        title="检查结果"
        style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
      />
      <div className="form-container-content">
        <CheckEdit data={data} formCode={formCode} />
      </div>
    </div>
  );
}


export default Main;
