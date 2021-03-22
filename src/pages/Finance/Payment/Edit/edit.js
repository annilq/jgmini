import React, { useState, useEffect } from 'react';
import { Button, Form, notification, message } from 'antd';
import { connect } from 'react-redux';

import { PlusOutlined } from '@ant-design/icons';

import SectionHeader from '@/components/SectionHeader';

import Layer from '@/components/Layer';
import FormEdit from '@/components/CustomForm/edit/edit';
import TableList from '@/components/CustomForm/SubTable/detailList';
import styles from '@/components/CustomForm/index.less';
import useFormConfig from '@/hooks/useFormConfig';
import useLayerVisible from '@/hooks/useLayer';
import { isProjectMode } from "@/utils/utils"

import DetailList from './detail';

function Edit({ form, projectId, formCode: parentFormCode, onChange, value: defaultvalue }) {
  const value = defaultvalue || [];
  const formdata = form.getFieldsValue();
  const [detailform] = Form.useForm();
  const [visible, setVisible] = useLayerVisible(false);
  const [editIndex, setEditIndex] = useState(-1);
  const formCode = "FinancePaymentDetail"
  const { tableConfig } = useFormConfig(formCode);
  const { containers } = tableConfig;
  let data = {};
  if (editIndex > -1) {
    data = value[editIndex]
  }
  // console.log(formdata);
  useEffect(() => {
    if (projectId) {
      if (isProjectMode()) {
        form.setFieldsValue({ ...formdata, projectId })
      }
    }
  }, [projectId]);

  function onConfirm(params) {
    if (editIndex > -1) {
      value.splice(editIndex, 1, params);
    } else {
      value.push(params);
    }
    setVisible(false);
    const amount = value.reduce((arr, current) => arr + Number(current.amount), 0)
    form.setFieldsValue({ ...formdata, amount })
    onChange([...value])
  }

  function addRecord() {
    if (!formdata.projectId) {
      notification.warn({ message: "请先选择项目" });
      return
    }
    setVisible(true);
    setEditIndex(-1);
    detailform.resetFields();
  }

  function editDetail(index) {
    setEditIndex(index);
    detailform.setFieldsValue(value[index]);
    setVisible(true);
  }

  function remove(index) {
    value.splice(index, 1);
    const amount = value.reduce((arr, current) => arr + Number(current.amount), 0)
    form.setFieldsValue({ ...formdata, amount })
    onChange([...value])
  }

  function validateFields(fn) {
    detailform
      .validateFields()
      .then(values => {
        fn(values);
      })
      .catch(err => {
        const { errorFields } = err;
        message.error(errorFields[0].errors.toString());
      });
  }

  return (
    <>
      <SectionHeader title="付款单明细" style={{ marginTop: 10, paddingLeft: "18px" }} />
      <TableList
        value={value}
        extraProps={{
          formCode,
          referenceType: 1
        }}
        editcols
        onEdit={editDetail}
        remove={remove}
        expandable={{
          expandedRowRender: record => (
            <>
              {record.materialList && record.materialList.length > 0 &&
                (
                  <>
                    <SectionHeader title="物料明细" style={{ marginTop: 10, paddingLeft: "18px" }} />
                    <TableList
                      value={record.materialList}
                      extraProps={{
                        formCode: "ConPurMaterial",
                        referenceType: 1
                      }}
                      components={{
                        header: {
                          cell: (cellprops) => <th {...cellprops} style={{ backgroundColor: "#ebebeb" }} />,
                        },
                      }}
                    />
                  </>
                )}
              {record.invoiceList && record.invoiceList.length > 0 && (
                <>
                  <SectionHeader title="发票明细" style={{ marginTop: 10, paddingLeft: "18px" }} />
                  <TableList
                    value={record.invoiceList}
                    extraProps={{
                      formCode: "ReInvoice",
                      referenceType: 1
                    }}
                    components={{
                      header: {
                        cell: (cellprops) => <th {...cellprops} style={{ backgroundColor: "#ebebeb" }} />,
                      },
                    }}
                  />
                </>
              )}
            </>
          ),
          indentSize: 0,
          rowExpandable: record => (record.materialList && record.materialList.length > 0) || (record.invoiceList && record.invoiceList.length > 0),
        }}
      />

      <Layer
        type="drawer"
        visible={visible}
        width="100%"
      >
        <div className={styles.baseForm}>
          <FormEdit
            containers={containers}
            formCode={formCode}
            formdata={data}
            parentformdata={{ formCode: parentFormCode, formdata }}
            form={detailform}
          >
            {DetailList}
          </FormEdit>
          <div className="actionBtns">
            {editIndex !== -1 && <Button onClick={() => { remove(editIndex) }}>删除</Button>}
            <Button
              type="primary"
              onClick={() => validateFields(onConfirm)}
            >
              保存
          </Button>
          </div>
        </div>
      </Layer>
      <Button
        type="primary"
        ghost
        className="addNewBtn"
        onClick={addRecord}
        icon={<PlusOutlined />}
      >
        新增
      </Button>
    </>
  );
}
export default connect(({ project }) => ({
  projectId: project.project.id,
}))(Edit);
