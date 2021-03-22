import React from 'react';

import { SubTable } from '@/components/CustomForm';
import SectionHeader from '@/components/SectionHeader';

function Edit({ form, onChange, value: defaultvalue }) {
  const value = defaultvalue || [];
  const formdata = form.getFieldsValue();


  function onChangehandle(data) {
    onChange(data);
  }

  return (
    <>
      <SectionHeader title="物资明细" style={{ margin: '8px' }} />
      <SubTable
        extraProps={{
          formCode: 'materialDetail',
          referenceType: 1,
        }}
        parentFormCode="materialPlan"
        value={value}
        omitCols={['useNum', 'finishRate']}
        onChange={onChangehandle}
        formdata={formdata}
      />
    </>
  );
}
export default Edit;
