import React from 'react';

import SectionHeader from '@/components/SectionHeader';
import Detail from '@/components/CustomForm/detail/combine';
import TableList from '@/components/CustomForm/SubTable/tableList';

function Main(props) {
  const { item, formCode } = props;
  const { detailList = [] } = item;

  return (
    <Detail item={item} formCode={formCode}>
      {detailList && detailList.length > 0 && (
        <div className="containers">
          <SectionHeader
            title="农民工工资明细"
            style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
          />
          <TableList
            extraProps={{
              formCode: 'Salary',
              referenceType: 1,
            }}
            value={detailList}
          />
        </div>
      )}
    </Detail>
  );
}
export default Main;
