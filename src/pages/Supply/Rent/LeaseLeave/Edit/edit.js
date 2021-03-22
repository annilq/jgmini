import React, { useEffect, useRef } from 'react';

import SectionHeader from '@/components/SectionHeader';
import SubTable from '@/components/CustomForm/SubTable';
import { flatdata } from '@/models/jgtablemodel';
import Service from '@/services';

function Edit({ form, onChange, value: defaultvalue }) {
  const value = defaultvalue || [];
  const formdata = form.getFieldsValue();

  const { leaseInId } = formdata;
  const firstMount = useRef(true);
  useEffect(
    () => {
      async function getList() {
        if (leaseInId) {
          const response = await Service.Rent.LeaseIn.query({ id: leaseInId });
          if (response) {
            const data = flatdata(response.resp);
            const newData =
              data.leaseDetailList && data.leaseDetailList.map(({ id, exts, ...rest }) => rest);
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
    [leaseInId]
  );
  const title = "物资明细";
  return (
    <div className="containers">
      <SectionHeader title={title} style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '18px' , paddingRight: '12px' }} />
      <SubTable
        extraProps={{
          formCode: 'leaseOutDetail',
          referenceType: 1,
        }}
        parentFormCode="leaseOut"
        value={value}
        onChange={onChange}
        formdata={formdata}
      />
    </div>
  );
}
export default Edit;
