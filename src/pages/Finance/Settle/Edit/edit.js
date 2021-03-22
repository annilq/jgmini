import React, { useEffect, useState, useRef } from 'react';
import { Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

import SectionHeader from '@/components/SectionHeader';
import DataPicker from '@/components/CustomForm/DataPicker/datapicker';

import { ConTypes } from '@/components/CustomForm/controlTypes';
import FormEditItem from '@/components/CustomForm/FormItem/edit';
import { query } from '@/services/contract/inContract';
import { isProjectMode } from "@/utils/utils"

function Edit({ form, id, onChange, projectId, formCode: masterFormCode, value: defaultvalue }) {
  const value = defaultvalue || [];
  const formdata = form.getFieldsValue();
  const [formCode, setFormCode] = useState();
  const [contractInfo, setContractInfo] = useState({});
  const { contractCate, paymentFlowType } = contractInfo;
  const { contractId } = formdata
  const ref = useRef();

  useEffect(() => {
    if (contractId && contractCate) {
      switch (parseInt(contractCate, 10)) {
        case 0:
          setFormCode("ConLeaseMachine")
          break;
        case 3:
          setFormCode("ConPurMaterial")
          break;
        case 4:
          setFormCode("ConLabour")
          break;
        case 5:
          setFormCode("ConConstruction")
          break;
        default:
          break;
      }
    }

    if (ref.current && ref.current !== contractId) {
      onChange([])
    }
    ref.current = contractId;
  }, [contractCate, contractId]);

  useEffect(() => {
    async function getData() {
      const response = await query({ id: contractId })
      if (response && response.resp) {
        setContractInfo(response.resp)
      }
    }
    if (contractId) {
      getData()
    }

  }, [contractId]);

  useEffect(() => {
    if (projectId) {
      if (isProjectMode()) {
        form.setFieldsValue({ ...formdata, projectId })
      }
    }
  }, [projectId]);

  // 目前只针对材料采购合同
  if (contractCate !== "3" || paymentFlowType !== "2") {
    return false
  }
  return (
    <>
      <SectionHeader title="物资明细" style={{ marginTop: 10 }}>
        <span style={{ float: "right" }}>
          <DataPicker
            formCode='materialDetail'
            defaultParams={{ contractId, type: "contract" }}
            placeholder="物料"
            value={value}
            rowKey="materialId"
            onChange={(data) => onChange(data)}
          >
            <Button type="primary" icon={<DownloadOutlined />} style={{ marginLeft: 16 }}>选择物料</Button>
          </DataPicker>
          <Popconfirm
            title="确认清空？"
            onConfirm={() => onChange([])}
          >
            <Button icon={<DeleteOutlined />} style={{ margin: "10px 16px" }}>清空</Button>
          </Popconfirm>
        </span>
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