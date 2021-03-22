import React from 'react';
import { connect } from 'react-redux';

import SectionHeader from '@/components/SectionHeader';

import { ConTypes } from '@/components/CustomForm/controlTypes';
import FormEditItem from '@/components/CustomForm/FormItem/edit';

// import CustomUpload from '@/components/CustomUpload';
// import { bizFinSalary as api } from '@/services/api';
// import FormEvent from '@/utils/formevent';

function Edit({ form, id, onChange, formCode: masterFormCode, value: defaultvalue }) {
  const value = defaultvalue || [];
  const formdata = form.getFieldsValue();
  const formCode = "Salary"
  // function onFinishUpload(data) {
  //   const newvalue = value.concat(data.resp)
  //   onChange(newvalue);
  //   FormEvent.emitdata(masterFormCode, id, { channel: id, value: newvalue, emitType: 1 });
  // }

  return (
    <>
      <SectionHeader title="农民工工资明细" style={{ marginTop: 10,paddingLeft: 18 }}>
        {/* <CustomUpload
          fileName="multipartFile"
          onFinishUpload={onFinishUpload}
          templateUrl="/template/salaryDetail.xlsx"
          uploadUrl={api.excelImport}
          label="导入农民工工资表"
        /> */}
      </SectionHeader>
      <FormEditItem
        data={{
          extraProps: { formCode, referenceType: 1, },
          controlLabel: '明细',
          placeHolder: '明细',
          controlType: ConTypes.SUBTABLE,
          controlCode: id,
        }}
        form={form}
        formdata={formdata}
        formCode={masterFormCode}
        value={value}
        onChange={onChange}
        id={id}
      />
    </>
  );
}
export default connect(({ project }) => ({
  projectId: project.project.id,
}))(Edit);