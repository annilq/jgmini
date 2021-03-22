import React from 'react';

import SubTable from '@/components/CustomForm/SubTable';
import SectionHeader from '@/components/SectionHeader';

function Edit({ form, onChange, value: defaultvalue }) {
  const value = defaultvalue || [];
  const formdata = form.getFieldsValue();

  function onChangehandle(data) {
    onChange(data)
  }
  const title = "资金填报明细";
  return (
    <div className="containers">
      <SectionHeader title={title} style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '18px' , paddingRight: '12px' }} />
      <SubTable
        extraProps={{
          formCode: 'FundPlanDetails',
          referenceType: 1,
        }}
        parentFormCode="project_fund_plan"
        value={value}
        onChange={onChangehandle}
        formdata={formdata}
      />
    </div>
  );
}
export default Edit;

