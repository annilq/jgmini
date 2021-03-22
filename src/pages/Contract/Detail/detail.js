import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import TableList from '@/components/CustomForm/SubTable/detailList';

function Main(props) {
  const formCode = "ConPurMaterial";

  const { data = {} } = props;
  const { detailList } = data;
  return (
    <div className="containers">
      <SectionHeader
        title="合同明细"
        style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
      />
      <TableList
        extraProps={{
          formCode,
          referenceType: 1,
        }}
        formdata={data}
        value={detailList}
      />
    </div>

  );

}
export default Main;
