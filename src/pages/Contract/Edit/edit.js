import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { ConTypes } from '@/components/CustomForm/controlTypes';
import FormEditItem from '@/components/CustomForm/FormItem/edit';
import DataPicker from '@/components/CustomForm/DataPicker/datapicker';
import SectionHeader from '@/components/SectionHeader';

import { isProjectMode } from "@/utils/utils"

// contractCate 合同分类
// 0 ConLeaseMachine 机械租赁
// 3 ConPurMaterial 材料采购
// 4 ConLabour 劳务分包
// 5 ConConstruction 施工合同

function Edit({ form, onChange, projectId: projectModeId, value: defaultvalue, id, formCode: masterFomcode }) {
  const value = defaultvalue || [];
  const formCode="ConPurMaterial";

  const formdata = form.getFieldsValue();

  let { projectId } = formdata;
  if (isProjectMode()) {
    projectId = projectModeId
  }
  const title = "合同明细";
  return (
    <div className="containers">
      <SectionHeader title={title} style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '18px' , paddingRight: '12px' }} >
        <div style={{ float: "right" }}>
          {projectId && (
            <DataPicker
              formCode='materialDetail'
              defaultParams={{ projectId, type: "project" }}
              placeholder="物料计划"
              value={value}
              rowKey="materialId"
              onChange={data => onChange(data)}
            >
              <Button type="primary" icon={<DownloadOutlined />}>物料计划</Button>
            </DataPicker>
          )
          }
          <Popconfirm
            title="确认清空？"
            onConfirm={() => onChange([])}
          >
            <Button icon={<DeleteOutlined />} style={{ marginLeft: 10 }}>清空</Button>
          </Popconfirm>
        </div>
      </SectionHeader>
      <FormEditItem
        data={{
          extraProps: { formCode, referenceType: 1, },
          // 上面设置了title，这里要隐藏title
          controlLabel: "合同明细",
          placeHolder: '合同',
          controlType: ConTypes.SUBTABLE,
          controlCode: id,
        }}
        form={form}
        formdata={formdata}
        formCode={masterFomcode}
        value={value}
        onChange={onChange}
        id={id}
      />
    </div>
  );
}
export default connect(({ project }) => ({
  projectId: project.project.id,
}))(Edit);
