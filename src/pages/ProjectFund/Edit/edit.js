import React from 'react';
import { SubTable } from '@/components/CustomForm';
import SectionHeader from '@/components/SectionHeader';

// 因为详情页面是定制的，所以这个表单就没有加载自定义里面
// 后面可以做一个详情是隐藏的配置来隐藏该项目
function Edit({ form, onChange, value: defaultvalue }) {
  const value = defaultvalue || [];
  const formdata = form.getFieldsValue();

  function onChangehandle(data) {
    onChange(data)
  }
  const title = "资金计划明细";
  return (
    <div className="containers">
      <SectionHeader title={title} style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '18px' , paddingRight: '12px' }} />
      <SubTable
        extraProps={{
          formCode: 'FundPlanSubitems',
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
