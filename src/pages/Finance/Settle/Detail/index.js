import React from 'react';

import SectionHeader from '@/components/SectionHeader';
import Detail from '@/components/CustomForm/detail/combine';
import TableList from '@/components/CustomForm/SubTable/detailList';

function Main(props) {
  const { item, formCode } = props;
  const { materialList = [] } = item;

  return (
    <Detail item={item} formCode={formCode}>
      {materialList && materialList.length > 0 && (
        <div className="containers">
          <SectionHeader
            title="物资明细"
            style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
          />
          <TableList
            extraProps={{
              formCode: 'materialDetail',
              referenceType: 1,
            }}
            value={item.materialList}
          />
        </div>
      )}
    </Detail>
  );
}
export default Main;
