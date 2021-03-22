import React, { useEffect } from 'react';
import { Button, Col, Row, Form } from 'antd';
import { layerBoxStyle, layerContentStyle, layerFooterStyle } from '@/common/styles/layer';
import FormEditItem from '@/components/CustomForm/FormItem/edit';
import { ConTypes } from '@/components/CustomForm/controlTypes';

const FormItem = Form.Item;
const ExtraFormConfigs = [
  {
    extraProps: { formCode: 'Project', nameCode: 'projectName' },
    controlLabel: '项目名称',
    placeHolder: '项目名称',
    controlType: ConTypes.DATAPICKER,
    controlCode: 'projectId',
  },
  {
    extraProps: { formCode: 'User', nameCode: 'principalName' },
    controlLabel: '负责人',
    placeHolder: '负责人',
    controlType: ConTypes.DATAPICKER,
    controlCode: 'principalId',
  },
  {
    extraProps: { formCode: 'User', nameCode: 'approverName' },
    controlLabel: '审核人',
    placeHolder: '审核人',
    controlType: ConTypes.DATAPICKER,
    controlCode: 'approverId',
  },
  {
    extraProps: { formCode: 'User', multiple: true, nameCode: 'participantUserName' },
    controlLabel: '参与人',
    placeHolder: '参与人',
    controlType: ConTypes.DATAPICKER,
    controlCode: 'participantUserId',
  },
  {
    extraProps: { formCode: 'User', multiple: true, nameCode: 'copyToUserName' },
    controlLabel: '抄送人',
    placeHolder: '抄送人',
    controlType: ConTypes.DATAPICKER,
    controlCode: 'copyToUserId',
  },
];

function Edit(props) {
  const { item = {}, submit, close } = props;
  const [form] = Form.useForm();

  const { id } = item;
  useEffect(
    () => {
      if (id) {
        form.setFieldsValue(item);
      }
    },
    [id]
  );

  function handleSubmit(values) {
    submit({ id: item.id, ...values });
  }

  return (
    <div style={layerBoxStyle}>
      <Form
        layout="vertical"
        style={layerContentStyle}
        onFinish={handleSubmit}
        form={form}
        initialValues={item}
      >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {ExtraFormConfigs.map(config => {
            const { controlCode, controlLabel, extraProps } = config;
            return (
              <Col span={24} data-controltype={21} key={controlCode}>
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
                          formdata={{ ...item, ...formInstance.getFieldsValue() }}
                          formCode="TaskConfig"
                        />
                      </FormItem>
                    );
                  }}
                </FormItem>
                <FormItem name={extraProps.nameCode} style={{ display: 'none' }}>
                  <span />
                </FormItem>
              </Col>
            );
          })}
        </Row>
        <div style={layerFooterStyle}>
          <Button onClick={close} style={{ marginRight: '16px', padding: '0 20px',  }}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" style={{ padding: '0 20px',  }}>
            提交
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Edit;
