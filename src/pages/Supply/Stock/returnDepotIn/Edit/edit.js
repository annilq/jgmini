import React, { useEffect, useRef, forwardRef } from 'react';

import SubTable from '@/components/CustomForm/SubTable';
import SectionHeader from '@/components/SectionHeader';
import { flatdata } from '@/models/jgtablemodel';
import Service from '@/services';

function Edit({ form, onChange, value: defaultvalue }) {
  const value = defaultvalue || [];
  const formdata = form.getFieldsValue();

  const { depotOutId } = formdata;
  const firstMount = useRef(true);
  useEffect(
    () => {
      async function getList() {
        if (depotOutId) {
          const response = await Service.Supply.DepotOut.query({ id: depotOutId });
          if (response) {
            const data = flatdata(response.resp);
            const newData =
              data.depotInOutDetailList && data.depotInOutDetailList.map(({ id, ...rest }) => rest);
            onChange(newData);
          }
        }
      }
      // 第一次用默认值，后面再用
      if (!firstMount.current) {
        getList();
      } else {
        firstMount.current = false;
      }
    },
    [depotOutId]
  );
  const title = "物资明细";
  return (
    <div className="containers">
      <SectionHeader title={title} style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '18px' , paddingRight: '12px' }} />
      <SubTable
        extraProps={{
          formCode: 'DepotInOutDetail',
          referenceType: 1,
        }}
        parentFormCode="ReturnDepotIn"
        value={value}
        onChange={onChange}
        formdata={formdata}
      />
    </div>
  );
}
export default forwardRef(Edit);
