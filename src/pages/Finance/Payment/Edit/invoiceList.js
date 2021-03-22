import React from 'react';

import SectionHeader from '@/components/SectionHeader';
import { ConTypes } from '@/components/CustomForm/controlTypes';
import FormEditItem from '@/components/CustomForm/FormItem/edit';

function Edit({ form, id, onChange, value: defaultvalue, parentformdata }) {
  const value = defaultvalue || [];
  const formdata = form.getFieldsValue();
  // console.log(parentformdata);
  return (
    <>
      <SectionHeader title="发票明细" style={{ marginTop: 10, paddingLeft: 18 }} />
      <FormEditItem
        data={{
          extraProps: {
            formCode: "ReInvoice",
            referenceType: 1,
          },
          controlLabel: '明细',
          placeHolder: '明细',
          controlType: ConTypes.SUBTABLE,
          controlCode: id,
        }}
        form={form}
        formdata={{ ...formdata, projectId: parentformdata.formdata.projectId }}
        formCode="PaymentFinance"
        value={value}
        onChange={onChange}
        id={id}
      />
    </>
  );
}
export default Edit;
