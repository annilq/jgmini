import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Form, message } from 'antd';

import { ImageUpload } from '@/components/CustomForm';
import FormEditItem from '@/components/CustomForm/FormItem/edit';
import { ConTypes } from '@/components/CustomForm/controlTypes';

function Edit(props) {
  const { data, dispatch, formCode } = props;
  const [form] = Form.useForm()
  const handleSubmit = values => {

    dispatch({
      type: 'jgTableModel/updateRemote',
      payload: {
        ...data,
        inspectionDetails: [
          { ...data.inspectionDetails[0], ...values },
        ],
        formCode
      },
      callback: () => {
        dispatch({
          type: 'jgTableModel/listRemote',
        });
        NativeUtil.popWebHistory()
      },
    });

  };

  function validateFields(fn) {
    form
      .validateFields()
      .then(values => {
        fn(values);
      })
      .catch(err => {
        const { errorFields } = err;
        message.error(errorFields[0].errors.toString());
      });
  }

  const formdata = data || {};

  return (
    <Form
      initialValues={formdata}
      onFinish={handleSubmit}
      layout="vertical"
      form={form}
      style={{ width: "100%" }}
    >
      <Form.Item
        name="result"
        label="验收意见"
        rules={[{ required: true, message: '请输入验收意见' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item name="picId" label="检查图片">
        <ImageUpload />
      </Form.Item>
      <Form.Item
        name="judgeType"
        label="验收结果"
        rules={[{ required: true, message: '请选择验收结果' }]}
        style={{ margin: "10px 0" }}
      >
        <FormEditItem
          data={{
            extraProps: {
              flag: 'inspectStatusMap',
              type: 2,
            },
            controlCode: "judgeType",
            controlType: ConTypes.SELECT,
            placeHolder: "验收结果"
          }}
          form={form}
        />
      </Form.Item>
      <div className="actionBtns">
        <Button type="primary" onClick={() => validateFields(handleSubmit)} style={{ marginRight: '16px', padding: '0 20px' }}>
          提交
        </Button>
        <Button onClick={NativeUtil.popWebHistory} style={{ marginRight: '16px', padding: '0 20px' }}>
          取消
        </Button>
      </div>
    </Form>
  );

}

export default connect()(Edit);
