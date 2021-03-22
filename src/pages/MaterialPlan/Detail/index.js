import React, { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { Input } from 'antd';

import Detail from '@/components/CustomForm/detail/combine';
import TableList from '@/components/CustomForm/SubTable/detailList';

function Main(props) {
  const { item, formCode } = props;

  const [keyword, setKeyword] = useState();

  const onSearch = (searchParams) => {
    setKeyword(searchParams);
  };

  const getValue = () => {
    if (keyword) {
      return item.detailList.filter((detail) => detail.materialName.indexOf(keyword) !== -1);
    }

    return item.detailList;
  };

  return (
    <Detail item={item} formCode={formCode}>
      {item.detailList && item.detailList.length > 0 && (
        <div className="containers">
          <SectionHeader
            title="物资明细"
            style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
          >
            <Input.Search
              placeholder="物料名称"
              onSearch={onSearch}
              style={{ width: 200, marginLeft: '16px' }}
            />
          </SectionHeader>
          <TableList
            extraProps={{
              formCode: 'materialDetail',
              referenceType: 1,
            }}
            pagination
            value={getValue()}
          />
        </div>
      )}
    </Detail>
  );
}
export default Main;
