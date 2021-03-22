import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';

import Layer from '@/components/Layer';
import FormEditItem from '@/components/CustomForm/FormItem/edit';
import { ConTypes } from '@/components/CustomForm/controlTypes';

const FormItem = Form.Item;

const config = {
  extraProps: { formCode: 'User', nameCode: 'canSeeUserName', multiple: true },
  controlLabel: '可见人员',
  placeHolder: '可见人员',
  controlType: ConTypes.DATAPICKER,
  controlCode: 'canSeeUserId',
};
function Main({ formdata, dispatch }) {
  const { id } = formdata;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  function handleFinanceChange(values) {
    dispatch({
      type: 'project/addCanSeeUser',
      payload: { ...values, id },
      callback() {
        setVisible(false);
        dispatch({ type: 'jgTableModel/pageRemote' });
      },
    });
  }
  const {
    controlCode,
    controlLabel,
    extraProps: { nameCode },
  } = config;
  return (
    <>
      {formdata.canSeeUserName ? (
        <div>
          {formdata.canSeeUserName}{' '}
          <span onClick={() => setVisible(true)} style={{ color: '#4095ff', cursor: 'pointer' }}>
            (配置)
          </span>{' '}
        </div>
      ) : (
          <span onClick={() => setVisible(true)} style={{ color: '#4095ff', cursor: 'pointer' }}>
            配置项目可看人员
          </span>
        )}
      <Layer
        title="配置项目可看人员"
        visible={visible}
        onClose={() => setVisible(false)}
        footer={null}
      >
        <Form onFinish={handleFinanceChange} form={form} initialValues={formdata}>
          <FormItem
            shouldUpdate={(prevValues, curValues) =>
              prevValues[controlCode] !== curValues[controlCode]
            }
          >
            {formInstance => {
              return (
                <FormItem name={controlCode} label={controlLabel}>
                  <FormEditItem
                    data={config}
                    form={form}
                    formdata={{ ...formdata, ...formInstance.getFieldsValue() }}
                    formCode="Task"
                  />
                </FormItem>
              );
            }}
          </FormItem>
          <FormItem name={nameCode} style={{ display: 'none' }}>
            <span />
          </FormItem>
          <div style={{ textAlign: "center" }}>
            <Button type="primary" style={{ marginBottom: '24px' }} htmlType="submit">
              保存
          </Button>
          </div>
        </Form>
      </Layer>
    </>
  );
}
export default connect(({ dashboard, project, loading }) => ({
  dashboard,
  project: project.project,
  financeLoading:
    loading.effects['dashboard/receiptRemote'] || loading.effects['dashboard/payRemote'] || false,
}))(Main);
